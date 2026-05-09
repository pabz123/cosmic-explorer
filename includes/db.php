<?php
/**
 * Cosmic Explorer - Database Connection
 * 
 * Creates a PDO connection to the SQLite database for easy deployment.
 */

require_once __DIR__ . '/config.php';

try {
    // Use an SQLite database file stored in the project directory
    $dbFile = __DIR__ . '/../database.sqlite';
    $dsn = "sqlite:" . $dbFile;
    
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    $pdo = new PDO($dsn, null, null, $options);
    
    // Verify if tables exist, if not, initialize
    $check = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
    if (!$check->fetch()) {
        $schema = file_get_contents(__DIR__ . '/../sql/schema.sql');
        if ($schema) {
            // Remove MySQL specific commands that SQLite doesn't support
            $schema = preg_replace('/CREATE DATABASE IF NOT EXISTS \w+;/', '', $schema);
            $schema = preg_replace('/USE \w+;/', '', $schema);
            
            // SQLite requires "INTEGER PRIMARY KEY AUTOINCREMENT"
            // MySQL often uses "INT AUTO_INCREMENT PRIMARY KEY"
            $schema = preg_replace('/INT AUTO_INCREMENT PRIMARY KEY/i', 'INTEGER PRIMARY KEY AUTOINCREMENT', $schema);
            $schema = preg_replace('/INT\(\d+\) AUTO_INCREMENT PRIMARY KEY/i', 'INTEGER PRIMARY KEY AUTOINCREMENT', $schema);
            $schema = preg_replace('/INT PRIMARY KEY AUTO_INCREMENT/i', 'INTEGER PRIMARY KEY AUTOINCREMENT', $schema);
            
            // Basic translation of MySQL to SQLite types
            $schema = preg_replace('/INT\(\d+\)/i', 'INTEGER', $schema);
            $schema = str_replace('VARCHAR(255)', 'TEXT', $schema);
            $schema = str_replace('DATETIME DEFAULT CURRENT_TIMESTAMP', 'DATETIME DEFAULT CURRENT_TIMESTAMP', $schema);
            $schema = preg_replace('/ON UPDATE CURRENT_TIMESTAMP/i', '', $schema);
            
            // Split and execute multiple queries
            $queries = array_filter(array_map('trim', explode(';', $schema)));
            foreach ($queries as $query) {
                if (!empty($query)) {
                    $pdo->exec($query);
                }
            }
        }
    }

} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
