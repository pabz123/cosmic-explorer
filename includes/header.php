<?php
/**
 * Cosmic Explorer - Shared Header
 * 
 * Included at the top of every page. Contains:
 * - HTML head with meta tags and CSS
 * - Navigation bar with auth-aware links
 * - Flash message display
 */

require_once __DIR__ . '/functions.php';
require_once __DIR__ . '/auth.php';

$currentPage = getCurrentPage();
$user = getCurrentUser();
?>
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo isset($pageDescription) ? sanitize($pageDescription) : 'Explore the wonders of our solar system. Learn about Earth, Mars, Jupiter, and all the planets.'; ?>">
    <title><?php echo isset($pageTitle) ? sanitize($pageTitle) . ' | ' . APP_NAME : APP_NAME . ' — Explore Our Solar System'; ?></title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/styles.css">
    <?php if (isset($pageCSS)): ?>
        <link rel="stylesheet" href="css/<?php echo $pageCSS; ?>">
    <?php endif; ?>
</head>
<body>
    <!-- Stars Background -->
    <div class="stars-bg" id="starsBg"></div>

    <!-- Navigation -->
    <header class="site-header" id="siteHeader">
        <nav class="navbar" id="mainNav">
            <a href="index.php" class="nav-logo" id="navLogo">
                <span class="logo-icon">🪐</span>
                <span class="logo-text">Cosmic Explorer</span>
            </a>

            <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu">
                <span class="hamburger"></span>
            </button>

            <ul class="nav-links" id="navLinks">
                <li><a href="index.php" class="nav-link <?php echo $currentPage === 'index' ? 'active' : ''; ?>" id="navHome">Home</a></li>
                <li><a href="planets.php" class="nav-link <?php echo $currentPage === 'planets' ? 'active' : ''; ?>" id="navPlanets">Planets</a></li>
                <li><a href="compare.php" class="nav-link <?php echo $currentPage === 'compare' ? 'active' : ''; ?>" id="navCompare">Compare</a></li>
                <li><a href="quiz.php" class="nav-link <?php echo $currentPage === 'quiz' ? 'active' : ''; ?>" id="navQuiz">Quiz</a></li>
                <li><a href="contact.php" class="nav-link <?php echo $currentPage === 'contact' ? 'active' : ''; ?>" id="navContact">Contact</a></li>
            </ul>

            <div class="nav-actions">
                <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark/light theme" title="Toggle theme">
                    <span class="theme-icon-dark">🌙</span>
                    <span class="theme-icon-light">☀️</span>
                </button>

                <?php if ($user): ?>
                    <div class="nav-user" id="navUser">
                        <span class="user-avatar"><?php echo strtoupper(substr($user['username'], 0, 1)); ?></span>
                        <span class="user-name"><?php echo sanitize($user['username']); ?></span>
                        <div class="user-dropdown" id="userDropdown">
                            <a href="actions/process-logout.php" class="dropdown-link" id="logoutLink">Logout</a>
                        </div>
                    </div>
                <?php else: ?>
                    <a href="login.php" class="btn btn-outline btn-sm" id="navLogin">Login</a>
                    <a href="register.php" class="btn btn-primary btn-sm" id="navRegister">Sign Up</a>
                <?php endif; ?>
            </div>
        </nav>
    </header>

    <!-- Flash Messages -->
    <div class="flash-container">
        <?php displayFlashMessage(); ?>
    </div>

    <!-- Main Content -->
    <main class="main-content" id="mainContent">
