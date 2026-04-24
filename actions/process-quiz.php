<?php
/**
 * Process Quiz Score
 * 
 * Saves quiz score to database for logged-in users.
 * Accepts AJAX POST requests and returns JSON.
 */

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';
require_once __DIR__ . '/../includes/auth.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid method']);
    exit;
}

// Check authentication
if (!isLoggedIn()) {
    echo json_encode(['success' => false, 'error' => 'Not logged in']);
    exit;
}

// Validate CSRF
if (!validateCSRFToken($_POST['csrf_token'] ?? '')) {
    echo json_encode(['success' => false, 'error' => 'Invalid CSRF token']);
    exit;
}

$userId = $_SESSION['user_id'];
$score = intval($_POST['score'] ?? 0);
$totalQuestions = intval($_POST['total_questions'] ?? 10);
$timeTaken = intval($_POST['time_taken'] ?? 0);

// Basic validation
if ($score < 0 || $score > $totalQuestions || $totalQuestions <= 0) {
    echo json_encode(['success' => false, 'error' => 'Invalid score data']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO quiz_scores (user_id, score, total_questions, time_taken_seconds) 
        VALUES (:user_id, :score, :total, :time)
    ");
    $stmt->execute([
        'user_id' => $userId,
        'score' => $score,
        'total' => $totalQuestions,
        'time' => $timeTaken
    ]);

    echo json_encode(['success' => true, 'message' => 'Score saved']);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Database error']);
}
