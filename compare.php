<?php
/**
 * Cosmic Explorer - Planet Comparison Page
 */

$pageTitle = "Compare Planets";
$pageDescription = "Compare all 8 planets side by side. Sort by size, distance, moons, and more.";
$pageCSS = "compare.css";
$pageJS = "compare.js";

require_once 'includes/header.php';
?>

<section class="compare-hero">
    <span class="section-label animate-fade-in">Side by Side</span>
    <h1 class="animate-fade-in-up">Compare the Planets</h1>
    <p class="animate-fade-in-up" style="animation-delay: 0.1s;">Click any column header to sort. Earth's row is highlighted for reference.</p>
</section>

<div class="table-container reveal">
    <table class="compare-table" id="compareTable">
        <thead>
            <tr>
                <th data-sort="name" id="thName">Planet <span class="sort-arrow">↕</span></th>
                <th data-sort="type" id="thType">Type <span class="sort-arrow">↕</span></th>
                <th data-sort="diameter" class="sorted" id="thDiameter">Diameter (km) <span class="sort-arrow">↑</span></th>
                <th data-sort="mass" id="thMass">Mass (× Earth) <span class="sort-arrow">↕</span></th>
                <th data-sort="distance" id="thDistance">Distance (M km) <span class="sort-arrow">↕</span></th>
                <th data-sort="moons" id="thMoons">Moons <span class="sort-arrow">↕</span></th>
                <th data-sort="orbital" id="thOrbital">Orbit (days) <span class="sort-arrow">↕</span></th>
                <th data-sort="gravity" id="thGravity">Gravity (m/s²) <span class="sort-arrow">↕</span></th>
            </tr>
        </thead>
        <tbody id="compareBody">
            <!-- Populated by JS -->
        </tbody>
    </table>
</div>

<?php require_once 'includes/footer.php'; ?>
