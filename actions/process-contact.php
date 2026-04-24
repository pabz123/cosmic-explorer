<?php
/**
 * Process Contact Form
 * 
 * Server-side validation (Layer 3 of 3) + database insert.
 */

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect('../contact.php');
}

// Validate CSRF token
if (!validateCSRFToken($_POST['csrf_token'] ?? '')) {
    setFlashMessage('error', 'Invalid request. Please try again.');
    redirect('../contact.php');
}

// Sanitize input
$name = sanitize($_POST['name'] ?? '');
$email = sanitize($_POST['email'] ?? '');
$subject = sanitize($_POST['subject'] ?? '');
$message = sanitize($_POST['message'] ?? '');

// Server-side validation
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Name must be at least 2 characters.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}

$validSubjects = ['general', 'feedback', 'bug', 'suggestion', 'other'];
if (empty($subject) || !in_array($subject, $validSubjects)) {
    $errors[] = 'Please select a valid subject.';
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Message must be at least 10 characters.';
}

if (!empty($errors)) {
    setFlashMessage('error', implode(' ', $errors));
    redirect('../contact.php');
}

try {
    // INSERT into database
    $stmt = $pdo->prepare("
        INSERT INTO contact_messages (name, email, subject, message) 
        VALUES (:name, :email, :subject, :message)
    ");
    $stmt->execute([
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message
    ]);

    setFlashMessage('success', 'Your message has been sent successfully! We\'ll get back to you soon. ✨');
    redirect('../contact.php');

} catch (PDOException $e) {
    setFlashMessage('error', 'Failed to send message. Please try again.');
    redirect('../contact.php');
}
