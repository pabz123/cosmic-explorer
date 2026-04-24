<?php
/**
 * Cosmic Explorer - Authentication Helpers
 * 
 * Functions for managing user authentication state via PHP sessions.
 */

require_once __DIR__ . '/config.php';

/**
 * Check if a user is currently logged in
 */
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

/**
 * Require login - redirect to login page if not authenticated
 */
function requireLogin() {
    if (!isLoggedIn()) {
        setFlashMessage('warning', 'Please log in to access this feature.');
        redirect('login.php');
    }
}

/**
 * Get the current logged-in user's data from the session
 */
function getCurrentUser() {
    if (isLoggedIn()) {
        return [
            'id' => $_SESSION['user_id'],
            'username' => $_SESSION['username'],
            'email' => $_SESSION['email']
        ];
    }
    return null;
}

/**
 * Set user session data after successful login
 */
function loginUser($user) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['email'] = $user['email'];
}

/**
 * Destroy the session and log the user out
 */
function logoutUser() {
    session_unset();
    session_destroy();
}
