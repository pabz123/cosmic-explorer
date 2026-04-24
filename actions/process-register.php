<?php
/**
 * Process Registration
 * 
 * Creates a new user with password_hash() and auto-logs them in.
 */

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';
require_once __DIR__ . '/../includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect('../register.php');
}

// Validate CSRF token
if (!validateCSRFToken($_POST['csrf_token'] ?? '')) {
    setFlashMessage('error', 'Invalid request. Please try again.');
    redirect('../register.php');
}

$username = sanitize($_POST['username'] ?? '');
$email = sanitize($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirm_password'] ?? '';

// Validation
$errors = [];

if (empty($username) || strlen($username) < 3) {
    $errors[] = 'Username must be at least 3 characters.';
}

if (!preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
    $errors[] = 'Username can only contain letters, numbers, and underscores.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}

if (empty($password) || strlen($password) < 6) {
    $errors[] = 'Password must be at least 6 characters.';
}

if ($password !== $confirmPassword) {
    $errors[] = 'Passwords do not match.';
}

if (!empty($errors)) {
    setFlashMessage('error', implode(' ', $errors));
    redirect('../register.php');
}

try {
    // Check if username or email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username OR email = :email LIMIT 1");
    $stmt->execute(['username' => $username, 'email' => $email]);
    
    if ($stmt->fetch()) {
        setFlashMessage('error', 'Username or email already exists.');
        redirect('../register.php');
    }

    // Hash password and insert user
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare("
        INSERT INTO users (username, email, password_hash) 
        VALUES (:username, :email, :password_hash)
    ");
    $stmt->execute([
        'username' => $username,
        'email' => $email,
        'password_hash' => $passwordHash
    ]);

    // Auto-login after registration
    $userId = $pdo->lastInsertId();
    loginUser([
        'id' => $userId,
        'username' => $username,
        'email' => $email
    ]);

    setFlashMessage('success', 'Account created! Welcome to Cosmic Explorer, ' . $username . '! 🎉');
    redirect('../index.php');

} catch (PDOException $e) {
    setFlashMessage('error', 'Registration failed. Please try again.');
    redirect('../register.php');
}
