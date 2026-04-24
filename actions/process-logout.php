<?php
/**
 * Process Logout
 * 
 * Destroys the session and redirects to home.
 */

require_once __DIR__ . '/../includes/functions.php';
require_once __DIR__ . '/../includes/auth.php';

logoutUser();
// Start a new session for the flash message
session_start();
setFlashMessage('info', 'You have been logged out. See you next time! 👋');
redirect('../index.php');
