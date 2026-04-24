/**
 * Cosmic Explorer - Planets Gallery JavaScript
 * 
 * Handles:
 * - Dynamic planet card rendering from data.js
 * - Filter by planet type
 * - Sort by distance, size, name
 */

document.addEventListener('DOMContentLoaded', () => {
    renderPlanets(PLANETS);
    initFilters();
    initSort();
});

let currentFilter = 'all';
let currentSort = 'position';

/* ---------- Render Planet Cards ---------- */
function renderPlanets(planets) {
    const grid = document.getElementById('planetsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (planets.length === 0) {
        grid.innerHTML = '<div class="no-results"><p>No planets match your filter.</p></div>';
        return;
    }

    planets.forEach((planet, index) => {
        const card = document.createElement('a');
        card.href = `planet.php?planet=${planet.slug}`;
        card.className = 'planet-card reveal visible';
        card.style.setProperty('--planet-color', planet.color);
        card.style.animationDelay = `${index * 0.08}s`;
        card.id = `planetCard_${planet.slug}`;

        let visualHTML = '';
        if (planet.image) {
            visualHTML = `<img src="${planet.image}" alt="${planet.name}" loading="lazy">`;
        } else {
            visualHTML = `<div class="css-planet" style="background: ${getPlanetGradient(planet.color)}; box-shadow: 0 0 30px ${planet.color}44;"></div>`;
        }

        card.innerHTML = `
            <div class="planet-card-visual">
                ${visualHTML}
            </div>
            <div class="planet-card-body">
                <div class="planet-card-type">${planet.type}</div>
                <h3 class="planet-card-name">${planet.name}</h3>
                <p class="planet-card-tagline">${planet.tagline}</p>
                <div class="planet-card-stats">
                    <div class="planet-card-stat">
                        <div class="planet-card-stat-value">${formatNumber(planet.diameter)} km</div>
                        <div class="planet-card-stat-label">Diameter</div>
                    </div>
                    <div class="planet-card-stat">
                        <div class="planet-card-stat-value">${planet.moons}</div>
                        <div class="planet-card-stat-label">Moons</div>
                    </div>
                </div>
                <div class="planet-card-cta">
                    <span>Explore ${planet.name}</span>
                    <span>→</span>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

/* ---------- Filter Logic ---------- */
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFilter = btn.dataset.filter;
            applyFilterAndSort();
        });
    });
}

/* ---------- Sort Logic ---------- */
function initSort() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        applyFilterAndSort();
    });
}

/* ---------- Apply Filter + Sort ---------- */
function applyFilterAndSort() {
    let filtered = [...PLANETS];

    // Filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.type === currentFilter);
    }

    // Sort
    switch (currentSort) {
        case 'position':
            filtered.sort((a, b) => a.position - b.position);
            break;
        case 'diameter-desc':
            filtered.sort((a, b) => b.diameter - a.diameter);
            break;
        case 'diameter-asc':
            filtered.sort((a, b) => a.diameter - b.diameter);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    renderPlanets(filtered);
}
