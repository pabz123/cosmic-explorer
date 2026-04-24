<?php
/**
 * Cosmic Explorer - Quiz Page
 * 
 * Interactive solar system quiz with scoring and leaderboard.
 * Scores are saved to the database for logged-in users.
 */

$pageTitle = "Solar System Quiz";
$pageDescription = "Test your knowledge about the solar system with our interactive quiz.";
$pageCSS = "quiz.css";
$pageJS = "quiz.js";

require_once 'includes/db.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';

$currentUser = getCurrentUser();

// Fetch leaderboard (top 10 scores with JOIN)
$leaderboard = [];
try {
    $stmt = $pdo->query("
        SELECT qs.score, qs.total_questions, qs.time_taken_seconds, qs.created_at, u.username
        FROM quiz_scores qs
        JOIN users u ON qs.user_id = u.id
        ORDER BY qs.score DESC, qs.time_taken_seconds ASC
        LIMIT 10
    ");
    $leaderboard = $stmt->fetchAll();
} catch (PDOException $e) {
    $leaderboard = [];
}

require_once 'includes/header.php';
?>

<section class="quiz-hero">
    <span class="section-label animate-fade-in">Test Yourself</span>
    <h1 class="animate-fade-in-up">Solar System Quiz</h1>
    <p class="animate-fade-in-up" style="animation-delay: 0.1s;">How much do you know about the planets? Find out now!</p>
</section>

<div class="quiz-container">
    <!-- Start Screen -->
    <div class="question-card quiz-start" id="quizStart">
        <div class="quiz-start-icon">🚀</div>
        <h2>Ready for Liftoff?</h2>
        <p>Answer 10 questions about the planets in our solar system. Let's see if you're a true cosmic explorer!</p>
        <div class="quiz-meta">
            <div class="quiz-meta-item">
                <div class="quiz-meta-value">10</div>
                <div class="quiz-meta-label">Questions</div>
            </div>
            <div class="quiz-meta-item">
                <div class="quiz-meta-value">4</div>
                <div class="quiz-meta-label">Options Each</div>
            </div>
            <div class="quiz-meta-item">
                <div class="quiz-meta-value">∞</div>
                <div class="quiz-meta-label">Time Limit</div>
            </div>
        </div>
        <?php if (!$currentUser): ?>
            <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 1.5rem;">
                💡 <a href="login.php">Log in</a> to save your score to the leaderboard!
            </p>
        <?php endif; ?>
        <button class="btn btn-primary btn-lg" onclick="startQuiz()" id="startQuizBtn">Start Quiz →</button>
    </div>

    <!-- Quiz Area (hidden initially) -->
    <div id="quizArea" style="display: none;">
        <div class="quiz-progress" id="quizProgress">
            <div class="quiz-progress-header">
                <span class="quiz-progress-text">Question <span class="quiz-progress-count" id="progressCount">1/10</span></span>
                <span class="quiz-progress-text" id="scoreDisplay">Score: 0</span>
            </div>
            <div class="progress-bar-track">
                <div class="progress-bar-fill" id="progressBarFill"></div>
            </div>
        </div>

        <div class="question-card" id="questionCard">
            <!-- Populated by JS -->
        </div>
    </div>

    <!-- Results (hidden initially) -->
    <div class="question-card quiz-results" id="quizResults" style="display: none;">
        <!-- Populated by JS -->
    </div>

    <!-- Leaderboard -->
    <?php if (!empty($leaderboard)): ?>
    <div class="leaderboard reveal" id="leaderboard">
        <h3>🏆 Leaderboard</h3>
        <div class="leaderboard-list">
            <?php foreach ($leaderboard as $i => $entry): ?>
                <div class="leaderboard-item">
                    <span class="leaderboard-rank"><?php echo $i + 1; ?></span>
                    <span class="leaderboard-name"><?php echo sanitize($entry['username']); ?></span>
                    <span class="leaderboard-score"><?php echo $entry['score']; ?>/<?php echo $entry['total_questions']; ?></span>
                    <span class="leaderboard-date"><?php echo date('M j', strtotime($entry['created_at'])); ?></span>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    <?php endif; ?>
</div>

<!-- Pass user info to JS -->
<script>
    const IS_LOGGED_IN = <?php echo $currentUser ? 'true' : 'false'; ?>;
    const CSRF_TOKEN = '<?php echo generateCSRFToken(); ?>';
</script>

<?php require_once 'includes/footer.php'; ?>
