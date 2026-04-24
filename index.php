<?php
/**
 * Cosmic Explorer - Home Page (Earth Landing)
 * 
 * The main landing page featuring Earth as the hero,
 * quick stats, planet previews, and NASA APOD widget.
 */

$pageTitle = "Home";
$pageDescription = "Explore Earth and the planets of our solar system. Discover fascinating facts, compare planets, and test your knowledge.";
$pageCSS = "home.css";
$pageJS = "home.js";

require_once 'includes/header.php';
?>

<!-- Hero Section -->
<section class="hero" id="heroSection">
    <div class="hero-content">
        <div class="hero-text animate-fade-in-up">
            <div class="hero-badge">
                <span class="pulse-dot"></span>
                <span>Exploring Since 2024</span>
            </div>
            <h1 class="hero-title">
                Discover Our<br>
                <span class="highlight">Cosmic Neighborhood</span>
            </h1>
            <p class="hero-subtitle">
                Journey through the solar system — from the scorching surface of Mercury to the icy winds of Neptune. 
                Start with our home, the pale blue dot we call <strong>Earth</strong>.
            </p>
            <div class="hero-actions">
                <a href="planets.php" class="btn btn-primary btn-lg" id="heroCTA">
                    Explore Planets <span>→</span>
                </a>
                <a href="quiz.php" class="btn btn-outline btn-lg" id="heroQuizCTA">
                    Take the Quiz
                </a>
            </div>
        </div>

        <div class="hero-visual animate-fade-in">
            <div class="earth-container">
                <div class="earth-glow"></div>
                <img src="assets/images/earth.png" alt="Planet Earth from space showing blue oceans and green continents" class="earth-image" id="heroEarthImage">
                <div class="earth-orbit-ring"></div>
            </div>
        </div>
    </div>
</section>

<!-- Earth Quick Stats -->
<section class="stats-strip" id="statsSection">
    <div class="stats-grid">
        <div class="stat-card reveal">
            <div class="stat-icon">🌍</div>
            <div class="stat-value" data-target="12742">0</div>
            <div class="stat-label">Diameter (km)</div>
        </div>
        <div class="stat-card reveal">
            <div class="stat-icon">💧</div>
            <div class="stat-value" data-target="71">0</div>
            <div class="stat-label">% Water Surface</div>
        </div>
        <div class="stat-card reveal">
            <div class="stat-icon">🌡️</div>
            <div class="stat-value" data-target="15">0</div>
            <div class="stat-label">Avg Temperature (°C)</div>
        </div>
        <div class="stat-card reveal">
            <div class="stat-icon">🌙</div>
            <div class="stat-value" data-target="1">0</div>
            <div class="stat-label">Natural Satellite</div>
        </div>
    </div>
</section>

<!-- Planet Preview -->
<section class="planet-preview" id="planetPreview">
    <div class="planet-preview-inner">
        <div class="section-header reveal">
            <span class="section-label">The Solar System</span>
            <h2>Meet the Planets</h2>
            <p>Eight unique worlds, each with their own story to tell</p>
        </div>
        <div class="planet-scroll" id="planetScroll">
            <!-- Populated by JS -->
        </div>
        <div class="text-center mt-xl reveal">
            <a href="planets.php" class="btn btn-outline btn-lg">View All Planets →</a>
        </div>
    </div>
</section>

<!-- NASA APOD Section -->
<section class="apod-section" id="apodSection">
    <div class="apod-inner">
        <div class="section-header reveal">
            <span class="section-label">Live from NASA</span>
            <h2>Astronomy Picture of the Day</h2>
            <p>A new stunning image from the cosmos, every single day</p>
        </div>
        <div class="apod-content reveal">
            <div class="apod-image-container" id="apodImageContainer">
                <div class="apod-loading" id="apodLoading">
                    <div class="apod-spinner"></div>
                    <span>Fetching from NASA...</span>
                </div>
            </div>
            <div class="apod-details">
                <h3 id="apodTitle">Loading...</h3>
                <p class="apod-date" id="apodDate"></p>
                <p class="apod-explanation" id="apodExplanation">Connecting to NASA's Astronomy Picture of the Day API...</p>
            </div>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="cta-section reveal">
    <div class="cta-inner">
        <span class="section-label">Ready to Explore?</span>
        <h2>Test Your Knowledge</h2>
        <p>Think you know all about the solar system? Take our quiz and see how many you can get right!</p>
        <a href="quiz.php" class="btn btn-primary btn-lg">Start the Quiz →</a>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>
