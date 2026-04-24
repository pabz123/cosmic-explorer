<?php
/**
 * Cosmic Explorer - Contact Page
 * 
 * Contact form with 3-layer validation:
 * 1. HTML5 attributes (required, type, minlength)
 * 2. JavaScript real-time validation
 * 3. PHP server-side validation before DB insert
 */

$pageTitle = "Contact Us";
$pageDescription = "Get in touch with us. Send us your questions, feedback, or just say hello!";
$pageCSS = "contact.css";
$pageJS = "contact.js";

require_once 'includes/header.php';
?>

<section class="contact-hero">
    <span class="section-label animate-fade-in">Get in Touch</span>
    <h1 class="animate-fade-in-up">Contact Us</h1>
    <p class="animate-fade-in-up" style="animation-delay: 0.1s;">Have a question about the cosmos? We'd love to hear from you!</p>
</section>

<div class="contact-container">
    <div class="contact-form-card reveal">
        <!-- Contact Form -->
        <form id="contactForm" action="actions/process-contact.php" method="POST" novalidate>
            <input type="hidden" name="csrf_token" value="<?php echo generateCSRFToken(); ?>">

            <div class="form-row">
                <div class="form-group">
                    <label for="contactName" class="form-label">Full Name *</label>
                    <input type="text" name="name" id="contactName" class="form-input" 
                           required minlength="2" maxlength="100" 
                           placeholder="John Doe"
                           aria-describedby="nameError">
                    <p class="form-error" id="nameError" role="alert"></p>
                </div>

                <div class="form-group">
                    <label for="contactEmail" class="form-label">Email Address *</label>
                    <input type="email" name="email" id="contactEmail" class="form-input" 
                           required maxlength="100"
                           placeholder="john@example.com"
                           aria-describedby="emailError">
                    <p class="form-error" id="emailError" role="alert"></p>
                </div>
            </div>

            <div class="form-group">
                <label for="contactSubject" class="form-label">Subject *</label>
                <select name="subject" id="contactSubject" class="form-select" required
                        aria-describedby="subjectError">
                    <option value="">Select a subject...</option>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="suggestion">Feature Suggestion</option>
                    <option value="other">Other</option>
                </select>
                <p class="form-error" id="subjectError" role="alert"></p>
            </div>

            <div class="form-group">
                <label for="contactMessage" class="form-label">Message *</label>
                <textarea name="message" id="contactMessage" class="form-textarea" 
                          required minlength="10" maxlength="2000"
                          placeholder="Tell us what's on your mind..."
                          aria-describedby="messageError"></textarea>
                <p class="form-error" id="messageError" role="alert"></p>
            </div>

            <div class="form-group">
                <label class="form-checkbox">
                    <input type="checkbox" name="newsletter" id="contactNewsletter" value="1">
                    <span>Subscribe to our cosmic newsletter for space news and updates</span>
                </label>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" id="contactSubmit" style="width: 100%;">
                Send Message 🚀
            </button>
        </form>

        <!-- Success State -->
        <div class="form-success" id="formSuccess">
            <div class="form-success-icon">✨</div>
            <h2>Message Sent!</h2>
            <p>Thank you for reaching out. We'll get back to you across the cosmos!</p>
            <a href="index.php" class="btn btn-outline btn-lg">Back to Home</a>
        </div>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>
