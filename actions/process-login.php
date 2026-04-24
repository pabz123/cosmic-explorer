<?php
/**
 * Process Login
 * 
 * Authenticates user with email + password_verify().
 * Starts PHP session on success.
 */

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';
require_once __DIR__ . '/../includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect('../login.php');
}

// Validate CSRF token
if (!validateCSRFToken($_POST['csrf_token'] ?? '')) {
    setFlashMessage('error', 'Invalid request. Please try again.');
    redirect('../login.php');
}

$email = sanitize($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

// Validation
if (empty($email) || empty($password)) {
    setFlashMessage('error', 'Please fill in all fields.');
    redirect('../login.php');
}

try {
    // Look up user by email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        // Login successful — start session
        loginUser($user);
        setFlashMessage('success', 'Welcome back, ' . $user['username'] . '! 🚀');
        redirect('../index.php');
    } else {
        setFlashMessage('error', 'Invalid email or password.');
        redirect('../login.php');
    }
} catch (PDOException $e) {
    setFlashMessage('error', 'Something went wrong. Please try again.');
    redirect('../login.php');
}
