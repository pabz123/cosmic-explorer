<?php
/**
 * Cosmic Explorer - Register Page
 */

$pageTitle = "Sign Up";
$pageDescription = "Create your Cosmic Explorer account to save quiz scores and leave comments.";
$pageCSS = "auth.css";

require_once 'includes/header.php';
?>

<div class="auth-container">
    <div class="auth-card">
        <div class="auth-header">
            <div class="auth-icon">🚀</div>
            <h1>Join the Explorers</h1>
            <p>Already have an account? <a href="login.php">Log in</a></p>
        </div>

        <form class="auth-form" action="actions/process-register.php" method="POST" id="registerForm">
            <input type="hidden" name="csrf_token" value="<?php echo generateCSRFToken(); ?>">

            <div class="form-group">
                <label for="regUsername" class="form-label">Username</label>
                <input type="text" name="username" id="regUsername" class="form-input"
                       required minlength="3" maxlength="50" 
                       pattern="[a-zA-Z0-9_]+"
                       placeholder="cosmic_explorer"
                       aria-describedby="regUsernameError">
                <p class="form-error" id="regUsernameError" role="alert"></p>
            </div>

            <div class="form-group">
                <label for="regEmail" class="form-label">Email Address</label>
                <input type="email" name="email" id="regEmail" class="form-input"
                       required maxlength="100" placeholder="your@email.com"
                       aria-describedby="regEmailError">
                <p class="form-error" id="regEmailError" role="alert"></p>
            </div>

            <div class="form-group">
                <label for="regPassword" class="form-label">Password</label>
                <input type="password" name="password" id="regPassword" class="form-input"
                       required minlength="6" placeholder="Min. 6 characters"
                       aria-describedby="regPasswordError">
                <p class="form-error" id="regPasswordError" role="alert"></p>
                <div class="password-strength" id="passwordStrength">
                    <div class="password-strength-bar">
                        <div class="password-strength-fill"></div>
                    </div>
                    <span class="password-strength-text" id="strengthText"></span>
                </div>
            </div>

            <div class="form-group">
                <label for="regConfirmPassword" class="form-label">Confirm Password</label>
                <input type="password" name="confirm_password" id="regConfirmPassword" class="form-input"
                       required placeholder="Repeat your password"
                       aria-describedby="regConfirmError">
                <p class="form-error" id="regConfirmError" role="alert"></p>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" id="registerSubmit">
                Create Account →
            </button>
        </form>
    </div>
</div>

<script>
// Password strength indicator
document.getElementById('regPassword')?.addEventListener('input', function() {
    const val = this.value;
    const container = document.getElementById('passwordStrength');
    const text = document.getElementById('strengthText');
    
    container.className = 'password-strength';
    
    if (val.length === 0) {
        text.textContent = '';
        return;
    }

    let strength = 0;
    if (val.length >= 6) strength++;
    if (val.length >= 10) strength++;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    if (strength <= 2) {
        container.classList.add('strength-weak');
        text.textContent = 'Weak';
    } else if (strength <= 3) {
        container.classList.add('strength-medium');
        text.textContent = 'Medium';
    } else {
        container.classList.add('strength-strong');
        text.textContent = 'Strong';
    }
});

// Confirm password match
document.getElementById('regConfirmPassword')?.addEventListener('input', function() {
    const password = document.getElementById('regPassword').value;
    const error = document.getElementById('regConfirmError');
    
    if (this.value && this.value !== password) {
        this.classList.add('error');
        this.classList.remove('valid');
        error.textContent = 'Passwords do not match';
        error.classList.add('visible');
    } else if (this.value) {
        this.classList.remove('error');
        this.classList.add('valid');
        error.textContent = '';
        error.classList.remove('visible');
    }
});
</script>

<?php require_once 'includes/footer.php'; ?>
