<?php
/**
 * Cosmic Explorer - Application Configuration
 * 
 * Database credentials and application settings.
 * Update these values to match your local environment.
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'cosmic_explorer');
define('DB_USER', 'root');
define('DB_PASS', '');       // Default XAMPP password is empty
define('DB_CHARSET', 'utf8mb4');

// Application Settings
define('APP_NAME', 'Cosmic Explorer');
define('APP_URL', 'http://localhost/cosmic-explorer');

// NASA API (Get your free key at https://api.nasa.gov/)
define('NASA_API_KEY', 'lIJVHXWftKSzoemGnp5cUDotWv5HInfX0JGOEz1U');

// Session Configuration
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
