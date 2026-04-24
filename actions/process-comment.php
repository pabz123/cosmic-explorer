<?php
/**
 * Process Comment (CRUD Operations)
 * 
 * Handles CREATE, UPDATE, and DELETE actions for planet comments.
 * All operations require authentication and CSRF validation.
 */

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';
require_once __DIR__ . '/../includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect('../planets.php');
}

// Check authentication
requireLogin();

// Validate CSRF
if (!validateCSRFToken($_POST['csrf_token'] ?? '')) {
    setFlashMessage('error', 'Invalid request. Please try again.');
    redirect('../planets.php');
}

$action = $_POST['action'] ?? '';
$planetName = sanitize($_POST['planet_name'] ?? '');
$userId = $_SESSION['user_id'];

switch ($action) {

    // ===== CREATE =====
    case 'create':
        $content = sanitize($_POST['content'] ?? '');

        if (empty($content) || strlen($content) < 3) {
            setFlashMessage('error', 'Comment must be at least 3 characters.');
            redirect("../planet.php?planet={$planetName}");
        }

        try {
            $stmt = $pdo->prepare("
                INSERT INTO comments (user_id, planet_name, content) 
                VALUES (:user_id, :planet, :content)
            ");
            $stmt->execute([
                'user_id' => $userId,
                'planet' => $planetName,
                'content' => $content
            ]);

            setFlashMessage('success', 'Comment posted! 💬');
        } catch (PDOException $e) {
            setFlashMessage('error', 'Failed to post comment.');
        }
        break;

    // ===== UPDATE =====
    case 'update':
        $commentId = intval($_POST['comment_id'] ?? 0);
        $content = sanitize($_POST['content'] ?? '');

        if (empty($content) || strlen($content) < 3) {
            setFlashMessage('error', 'Comment must be at least 3 characters.');
            redirect("../planet.php?planet={$planetName}");
        }

        try {
            // Only allow updating own comments
            $stmt = $pdo->prepare("
                UPDATE comments 
                SET content = :content 
                WHERE id = :id AND user_id = :user_id
            ");
            $stmt->execute([
                'content' => $content,
                'id' => $commentId,
                'user_id' => $userId
            ]);

            if ($stmt->rowCount() > 0) {
                setFlashMessage('success', 'Comment updated! ✏️');
            } else {
                setFlashMessage('error', 'Could not update comment.');
            }
        } catch (PDOException $e) {
            setFlashMessage('error', 'Failed to update comment.');
        }
        break;

    // ===== DELETE =====
    case 'delete':
        $commentId = intval($_POST['comment_id'] ?? 0);

        try {
            // Only allow deleting own comments
            $stmt = $pdo->prepare("
                DELETE FROM comments 
                WHERE id = :id AND user_id = :user_id
            ");
            $stmt->execute([
                'id' => $commentId,
                'user_id' => $userId
            ]);

            if ($stmt->rowCount() > 0) {
                setFlashMessage('success', 'Comment deleted. 🗑️');
            } else {
                setFlashMessage('error', 'Could not delete comment.');
            }
        } catch (PDOException $e) {
            setFlashMessage('error', 'Failed to delete comment.');
        }
        break;

    default:
        setFlashMessage('error', 'Invalid action.');
}

redirect("../planet.php?planet={$planetName}");
