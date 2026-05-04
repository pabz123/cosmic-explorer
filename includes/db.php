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
    
    // Auto-initialize schema if the file was just created
    if (filesize($dbFile) === 0) {
        $schema = file_get_contents(__DIR__ . '/../sql/schema.sql');
        if ($schema) {
            // Remove MySQL specific commands that SQLite doesn't support
            $schema = preg_replace('/CREATE DATABASE IF NOT EXISTS \w+;/', '', $schema);
            $schema = preg_replace('/USE \w+;/', '', $schema);
            
            // SQLite doesn't support AUTO_INCREMENT keyword directly, it uses AUTOINCREMENT
            $schema = str_replace('AUTO_INCREMENT', 'AUTOINCREMENT', $schema);
            // Basic translation of MySQL to SQLite schema
            $schema = preg_replace('/INT\(\d+\)/', 'INTEGER', $schema);
            $schema = str_replace('VARCHAR(255)', 'TEXT', $schema);
            $schema = str_replace('DATETIME DEFAULT CURRENT_TIMESTAMP', 'DATETIME DEFAULT CURRENT_TIMESTAMP', $schema);
            
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

