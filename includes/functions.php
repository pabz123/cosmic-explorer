<?php
/**
 * Cosmic Explorer - Utility Functions
 * 
 * Helper functions used across the application:
 * - Input sanitization
 * - Flash messages (session-based alerts)
 * - CSRF token generation
 */

require_once __DIR__ . '/config.php';

/**
 * Sanitize user input to prevent XSS attacks
 */
function sanitize($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Set a flash message in the session
 * Types: 'success', 'error', 'warning', 'info'
 */
function setFlashMessage($type, $message) {
    $_SESSION['flash'] = [
        'type' => $type,
        'message' => $message
    ];
}

/**
 * Display and clear flash message
 */
function displayFlashMessage() {
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        $type = sanitize($flash['type']);
        $message = sanitize($flash['message']);
        
        $icons = [
            'success' => '✓',
            'error' => '✕',
            'warning' => '⚠',
            'info' => 'ℹ'
        ];
        $icon = $icons[$type] ?? 'ℹ';

        echo '<div class="flash-message flash-' . $type . '" id="flashMessage">';
        echo '  <span class="flash-icon">' . $icon . '</span>';
        echo '  <span class="flash-text">' . $message . '</span>';
        echo '  <button class="flash-close" onclick="this.parentElement.remove()">×</button>';
        echo '</div>';
        
        unset($_SESSION['flash']);
    }
}

/**
 * Generate a CSRF token for form security
 */
function generateCSRFToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Validate CSRF token
 */
function validateCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Redirect to a URL
 */
function redirect($url) {
    header("Location: $url");
    exit();
}

/**
 * Get the current page name for nav active state
 */
function getCurrentPage() {
    return basename($_SERVER['PHP_SELF'], '.php');
}
