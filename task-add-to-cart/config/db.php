<?php
/**
 * Database Configuration & PDO Connection
 * Ultimez Frontend Developer Internship — Task 2: Add To Cart
 */

// Database credentials with environment variable fallback
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_NAME', getenv('DB_NAME') ?: 'ultimez_interview_tasks');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');
define('DB_PORT', getenv('DB_PORT') ?: '3306');

/**
 * Returns a shared PDO database instance.
 *
 * @return PDO
 * @throws PDOException
 */
function getDbConnection() {
    static $pdo = null;

    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            error_log("[Database Connection Error]: " . $e->getMessage());
            throw new Exception("Unable to connect to the database. Please check XAMPP MySQL status.");
        }
    }

    return $pdo;
}
