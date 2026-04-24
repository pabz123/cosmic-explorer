/**
 * Cosmic Explorer - Planet Detail JavaScript
 * 
 * Dynamically loads planet data based on URL parameter.
 * Renders hero, stats, fun facts, and atmosphere sections.
 */

document.addEventListener('DOMContentLoaded', () => {
    const slug = typeof CURRENT_PLANET_SLUG !== 'undefined' ? CURRENT_PLANET_SLUG : 'earth';
    const planet = getPlanetBySlug(slug);

    if (!planet) {
        document.getElementById('detailInfo').innerHTML = `
            <h1>Planet Not Found</h1>
            <p>We couldn't find data for "${slug}". <a href="planets.php">Browse all planets</a>.</p>
        `;
        return;
    }

    renderDetailHero(planet);
    renderDetailStats(planet);
    renderFunFacts(planet);
    renderAtmosphere(planet);
});

/* ---------- Hero Section ---------- */
function renderDetailHero(planet) {
    const visualContainer = document.getElementById('detailVisual');
    const infoContainer = document.getElementById('detailInfo');

    if (!visualContainer || !infoContainer) return;

    // Planet visual
    let visualHTML = '';
    if (planet.image) {
        visualHTML = `
            <div class="detail-planet-glow" style="background: radial-gradient(circle, ${planet.color}22, transparent 60%);"></div>
            <img src="${planet.image}" alt="${planet.name}" class="detail-planet-img" style="--planet-glow: ${planet.color}55;">
        `;
    } else {
        visualHTML = `
            <div class="detail-planet-glow" style="background: radial-gradient(circle, ${planet.color}22, transparent 60%);"></div>
            <div class="detail-planet-css" style="background: ${getPlanetGradient(planet.color)}; box-shadow: 0 0 60px ${planet.color}44;"></div>
        `;
    }
    visualContainer.innerHTML = visualHTML;

    // Planet info
    const prevPlanet = PLANETS.find(p => p.position === planet.position - 1);
    const nextPlanet = PLANETS.find(p => p.position === planet.position + 1);

    let navHTML = '<div class="planet-nav">';
    if (prevPlanet) {
        navHTML += `<a href="planet.php?planet=${prevPlanet.slug}">← ${prevPlanet.name}</a>`;
    }
    if (nextPlanet) {
        navHTML += `<a href="planet.php?planet=${nextPlanet.slug}">${nextPlanet.name} →</a>`;
    }
    navHTML += '</div>';

    infoContainer.innerHTML = `
        <span class="section-label">#${planet.position} from the Sun</span>
        <h1>${planet.name}</h1>
        <p class="detail-tagline">${planet.tagline}</p>
        <span class="detail-type-badge" style="background: ${planet.color}22; color: ${planet.color}; border: 1px solid ${planet.color}44;">${planet.type}</span>
        <p class="detail-description">${planet.description}</p>
        ${navHTML}
    `;
}

/* ---------- Stats Grid ---------- */
function renderDetailStats(planet) {
    const grid = document.getElementById('detailStatsGrid');
    if (!grid) return;

    const stats = [
        { icon: '📏', value: formatNumber(planet.diameter) + ' km', label: 'Diameter' },
        { icon: '⚖️', value: planet.mass + 'x Earth', label: 'Mass' },
        { icon: '☀️', value: planet.distanceFromSun + 'M km', label: 'Distance from Sun' },
        { icon: '🔄', value: formatNumber(planet.orbitalPeriod) + ' days', label: 'Orbital Period' },
        { icon: '🌀', value: planet.rotationPeriod + ' days', label: 'Rotation Period' },
        { icon: '🌙', value: planet.moons, label: 'Known Moons' },
        { icon: '🌡️', value: `${planet.temperature.min}° to ${planet.temperature.max}°C`, label: 'Temperature Range' },
        { icon: '🏋️', value: planet.gravity + ' m/s²', label: 'Surface Gravity' }
    ];

    grid.innerHTML = stats.map((stat, i) => `
        <div class="detail-stat-item reveal" style="animation-delay: ${i * 0.05}s;">
            <div class="detail-stat-icon">${stat.icon}</div>
            <div class="detail-stat-value">${stat.value}</div>
            <div class="detail-stat-label">${stat.label}</div>
        </div>
    `).join('');

    // Re-trigger scroll reveal
    initDetailReveal();
}

/* ---------- Fun Facts ---------- */
function renderFunFacts(planet) {
    const list = document.getElementById('funFactsList');
    if (!list) return;

    const icons = ['🔭', '⭐', '🪐', '🚀', '💫'];

    list.innerHTML = planet.funFacts.map((fact, i) => `
        <div class="fun-fact-item reveal" style="animation-delay: ${i * 0.1}s;">
            <span class="fun-fact-icon">${icons[i % icons.length]}</span>
            <span>${fact}</span>
        </div>
    `).join('');

    initDetailReveal();
}

/* ---------- Atmosphere ---------- */
function renderAtmosphere(planet) {
    const card = document.getElementById('atmosphereCard');
    if (!card) return;

    card.innerHTML = `
        <p>${planet.atmosphere}</p>
        <div class="atmosphere-visual" style="margin-top: 1.5rem;">
            <div style="height: 100%; width: 100%; background: linear-gradient(90deg, ${planet.color}, ${planet.color}88, ${planet.color}44); border-radius: 6px;"></div>
        </div>
    `;
}

/* ---------- Comment Edit Toggle ---------- */
function editComment(commentId) {
    const body = document.getElementById('commentBody_' + commentId);
    const editForm = document.getElementById('editForm_' + commentId);
    const editBtn = document.getElementById('editBtn_' + commentId);

    if (body && editForm) {
        body.style.display = 'none';
        editForm.style.display = 'block';
        editBtn.style.display = 'none';
    }
}

function cancelEdit(commentId) {
    const body = document.getElementById('commentBody_' + commentId);
    const editForm = document.getElementById('editForm_' + commentId);
    const editBtn = document.getElementById('editBtn_' + commentId);

    if (body && editForm) {
        body.style.display = 'block';
        editForm.style.display = 'none';
        editBtn.style.display = 'inline';
    }
}

/* ---------- Re-init Reveal for Dynamic Content ---------- */
function initDetailReveal() {
    const revealElements = document.querySelectorAll('.reveal:not(.visible)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}
