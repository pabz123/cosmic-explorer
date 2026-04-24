<?php
/**
 * Cosmic Explorer - Planets Gallery Page
 */

$pageTitle = "All Planets";
$pageDescription = "Explore all 8 planets of our solar system. Filter by type and discover fascinating facts about each world.";
$pageCSS = "planets.css";
$pageJS = "planets.js";

require_once 'includes/header.php';
?>

<!-- Gallery Hero -->
<section class="gallery-hero">
    <span class="section-label animate-fade-in">The Solar System</span>
    <h1 class="animate-fade-in-up">Explore All Planets</h1>
    <p class="animate-fade-in-up" style="animation-delay: 0.1s;">Eight extraordinary worlds orbiting our star, each with their own unique characteristics</p>
</section>

<!-- Filter Bar -->
<div class="filter-bar" id="filterBar">
    <button class="filter-btn active" data-filter="all" id="filterAll">All</button>
    <button class="filter-btn" data-filter="Terrestrial" id="filterTerrestrial">Terrestrial</button>
    <button class="filter-btn" data-filter="Gas Giant" id="filterGas">Gas Giants</button>
    <button class="filter-btn" data-filter="Ice Giant" id="filterIce">Ice Giants</button>

    <select class="sort-select" id="sortSelect">
        <option value="position">Sort: Distance ↑</option>
        <option value="diameter-desc">Sort: Size ↓</option>
        <option value="diameter-asc">Sort: Size ↑</option>
        <option value="name">Sort: Name A-Z</option>
    </select>
</div>

<!-- Planets Grid -->
<div class="planets-grid" id="planetsGrid">
    <!-- Populated by JavaScript -->
</div>

<?php require_once 'includes/footer.php'; ?>
