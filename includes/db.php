<?php
/**
 * Cosmic Explorer - Database Connection
 * 
 * Creates a PDO connection to the MySQL database.
 * Uses prepared statements for security against SQL injection.
 */

require_once __DIR__ . '/config.php';

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);

} catch (PDOException $e) {
    // In production, log this error and show a user-friendly message
    die("Database connection failed: " . $e->getMessage());
}
