<?php
/**
 * Cosmic Explorer - Planet Detail Page
 * 
 * Dynamic page that loads content based on ?planet= query parameter.
 * Features planet info, stats, fun facts, and a comments section (CRUD).
 */

$pageCSS = "planet-detail.css";
$pageJS = "planet-detail.js";

require_once 'includes/db.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';

// Get planet name from URL
$planetSlug = isset($_GET['planet']) ? strtolower(trim($_GET['planet'])) : 'earth';
$pageTitle = ucfirst($planetSlug);
$pageDescription = "Learn everything about {$pageTitle} — key facts, stats, atmosphere, and fun facts about this planet.";

// Fetch comments for this planet (READ operation with JOIN)
$currentUser = getCurrentUser();
$comments = [];

try {
    $stmt = $pdo->prepare("
        SELECT c.*, u.username 
        FROM comments c 
        JOIN users u ON c.user_id = u.id 
        WHERE c.planet_name = :planet 
        ORDER BY c.created_at DESC
    ");
    $stmt->execute(['planet' => $planetSlug]);
    $comments = $stmt->fetchAll();
} catch (PDOException $e) {
    // Database might not be set up yet — silently continue
    $comments = [];
}

require_once 'includes/header.php';
?>

<!-- Planet Detail Hero (populated by JS) -->
<section class="detail-hero" id="detailHero">
    <div class="detail-hero-inner" id="detailHeroInner">
        <!-- Populated by JS based on URL param -->
        <div class="detail-planet-visual" id="detailVisual"></div>
        <div class="detail-info" id="detailInfo">
            <p style="color: var(--color-text-muted);">Loading planet data...</p>
        </div>
    </div>
</section>

<!-- Stats Grid -->
<section class="detail-stats" id="detailStats">
    <div class="detail-stats-inner">
        <div class="detail-stats-grid" id="detailStatsGrid">
            <!-- Populated by JS -->
        </div>
    </div>
</section>

<!-- Fun Facts + Atmosphere -->
<section class="detail-extra" id="detailExtra">
    <div class="detail-extra-inner">
        <div class="fun-facts-section" id="funFacts">
            <h2>Did You Know? 🤔</h2>
            <div class="fun-facts-list" id="funFactsList">
                <!-- Populated by JS -->
            </div>
        </div>
        <aside class="atmosphere-section" id="atmosphereSection">
            <h2>Atmosphere</h2>
            <div class="atmosphere-card" id="atmosphereCard">
                <!-- Populated by JS -->
            </div>
        </aside>
    </div>
</section>

<!-- Comments Section (CRUD) -->
<section class="comments-section" id="commentsSection">
    <div class="comments-inner">
        <h2>Comments 💬</h2>

        <?php if ($currentUser): ?>
            <!-- CREATE: Add new comment form -->
            <form class="comment-form" action="actions/process-comment.php" method="POST" id="commentForm">
                <h3>Share your thoughts about <?php echo sanitize(ucfirst($planetSlug)); ?></h3>
                <input type="hidden" name="csrf_token" value="<?php echo generateCSRFToken(); ?>">
                <input type="hidden" name="planet_name" value="<?php echo sanitize($planetSlug); ?>">
                <input type="hidden" name="action" value="create">
                <div class="form-group">
                    <textarea class="form-textarea" name="content" placeholder="What do you find most fascinating about this planet?" required minlength="3" maxlength="1000" id="commentContent"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" id="submitComment">Post Comment</button>
            </form>
        <?php else: ?>
            <div class="login-prompt">
                <p>💫 <a href="login.php">Log in</a> or <a href="register.php">sign up</a> to leave a comment!</p>
            </div>
        <?php endif; ?>

        <!-- READ: Display comments -->
        <div class="comments-list" id="commentsList">
            <?php if (empty($comments)): ?>
                <div class="no-comments">
                    <p>No comments yet. Be the first to share your thoughts! 🚀</p>
                </div>
            <?php else: ?>
                <?php foreach ($comments as $comment): ?>
                    <div class="comment-card" id="comment_<?php echo $comment['id']; ?>">
                        <div class="comment-header">
                            <div class="comment-user">
                                <div class="comment-avatar"><?php echo strtoupper(substr($comment['username'], 0, 1)); ?></div>
                                <span class="comment-username"><?php echo sanitize($comment['username']); ?></span>
                            </div>
                            <span class="comment-date"><?php echo date('M j, Y · g:i A', strtotime($comment['created_at'])); ?></span>
                        </div>
                        <div class="comment-body" id="commentBody_<?php echo $comment['id']; ?>">
                            <?php echo sanitize($comment['content']); ?>
                        </div>

                        <?php if ($currentUser && $currentUser['id'] == $comment['user_id']): ?>
                            <!-- UPDATE & DELETE: Only visible to comment owner -->
                            <div class="comment-actions">
                                <button class="comment-action-btn" onclick="editComment(<?php echo $comment['id']; ?>)" id="editBtn_<?php echo $comment['id']; ?>">✏️ Edit</button>
                                <form action="actions/process-comment.php" method="POST" style="display: inline;" onsubmit="return confirm('Delete this comment?');">
                                    <input type="hidden" name="csrf_token" value="<?php echo generateCSRFToken(); ?>">
                                    <input type="hidden" name="comment_id" value="<?php echo $comment['id']; ?>">
                                    <input type="hidden" name="planet_name" value="<?php echo sanitize($planetSlug); ?>">
                                    <input type="hidden" name="action" value="delete">
                                    <button type="submit" class="comment-action-btn delete">🗑️ Delete</button>
                                </form>
                            </div>

                            <!-- Edit form (hidden by default) -->
                            <div class="comment-edit-form" id="editForm_<?php echo $comment['id']; ?>" style="display: none;">
                                <form action="actions/process-comment.php" method="POST">
                                    <input type="hidden" name="csrf_token" value="<?php echo generateCSRFToken(); ?>">
                                    <input type="hidden" name="comment_id" value="<?php echo $comment['id']; ?>">
                                    <input type="hidden" name="planet_name" value="<?php echo sanitize($planetSlug); ?>">
                                    <input type="hidden" name="action" value="update">
                                    <textarea class="form-textarea" name="content" required minlength="3" maxlength="1000"><?php echo sanitize($comment['content']); ?></textarea>
                                    <div class="comment-edit-actions">
                                        <button type="submit" class="btn btn-primary btn-sm">Save</button>
                                        <button type="button" class="btn btn-outline btn-sm" onclick="cancelEdit(<?php echo $comment['id']; ?>)">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- Pass planet slug to JS -->
<script>
    const CURRENT_PLANET_SLUG = '<?php echo sanitize($planetSlug); ?>';
</script>

<?php require_once 'includes/footer.php'; ?>
