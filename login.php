<?php
/**
 * Cosmic Explorer - Login Page
 */

$pageTitle = "Login";
$pageDescription = "Log in to your Cosmic Explorer account.";
$pageCSS = "auth.css";

require_once 'includes/header.php';
?>

<div class="auth-container">
    <div class="auth-card">
        <div class="auth-header">
            <div class="auth-icon">🔭</div>
            <h1>Welcome Back</h1>
            <p>Don't have an account? <a href="register.php">Sign up</a></p>
        </div>

        <form class="auth-form" action="actions/process-login.php" method="POST" id="loginForm">
            <input type="hidden" name="csrf_token" value="<?php echo generateCSRFToken(); ?>">

            <div class="form-group">
                <label for="loginEmail" class="form-label">Email Address</label>
                <input type="email" name="email" id="loginEmail" class="form-input"
                       required placeholder="your@email.com"
                       aria-describedby="loginEmailError">
                <p class="form-error" id="loginEmailError" role="alert"></p>
            </div>

            <div class="form-group">
                <label for="loginPassword" class="form-label">Password</label>
                <input type="password" name="password" id="loginPassword" class="form-input"
                       required minlength="6" placeholder="Enter your password"
                       aria-describedby="loginPasswordError">
                <p class="form-error" id="loginPasswordError" role="alert"></p>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" id="loginSubmit">
                Log In →
            </button>
        </form>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>
