/**
 * Cosmic Explorer - Home Page JavaScript
 * 
 * Handles:
 * - Animated stat counters with Intersection Observer
 * - Planet preview card rendering
 * - NASA APOD API fetch
 */

document.addEventListener('DOMContentLoaded', () => {
    initStatCounters();
    renderPlanetPreviews();
    fetchAPOD();
});

/* ---------- Stat Counters ---------- */
function initStatCounters() {
    const statValues = document.querySelectorAll('.stat-value[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                animateCounter(el, target, 1200);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(el => observer.observe(el));
}

/* ---------- Planet Previews ---------- */
function renderPlanetPreviews() {
    const container = document.getElementById('planetScroll');
    if (!container) return;

    // Show first 4 planets as preview
    const previewPlanets = PLANETS.slice(0, 4);

    previewPlanets.forEach((planet, index) => {
        const card = document.createElement('a');
        card.href = `planet.php?planet=${planet.slug}`;
        card.className = 'planet-mini-card reveal';
        card.style.setProperty('--planet-color', planet.color);
        card.style.animationDelay = `${index * 0.1}s`;
        card.id = `previewCard_${planet.slug}`;

        let visualHTML = '';
        if (planet.image) {
            visualHTML = `<img src="${planet.image}" alt="${planet.name}" loading="lazy">`;
        } else {
            visualHTML = `<div class="planet-gradient" style="background: ${getPlanetGradient(planet.color)};"></div>`;
        }

        card.innerHTML = `
            <div class="mini-planet-visual">
                ${visualHTML}
            </div>
            <div class="mini-planet-name">${planet.name}</div>
            <div class="mini-planet-type">${planet.type}</div>
        `;

        container.appendChild(card);
    });
}

/* ---------- NASA APOD Fetch ---------- */
async function fetchAPOD() {
    const imageContainer = document.getElementById('apodImageContainer');
    const loadingEl = document.getElementById('apodLoading');
    const titleEl = document.getElementById('apodTitle');
    const dateEl = document.getElementById('apodDate');
    const explanationEl = document.getElementById('apodExplanation');

    if (!imageContainer) return;

    try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=lIJVHXWftKSzoemGnp5cUDotWv5HInfX0JGOEz1U');
        
        if (!response.ok) throw new Error('NASA API request failed');

        const data = await response.json();

        // Remove loading spinner
        if (loadingEl) loadingEl.remove();

        // Insert image or video
        if (data.media_type === 'image') {
            const img = document.createElement('img');
            img.src = data.url;
            img.alt = data.title;
            img.loading = 'lazy';
            imageContainer.appendChild(img);
        } else if (data.media_type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = data.url;
            iframe.title = data.title;
            iframe.allow = 'autoplay; encrypted-media';
            iframe.allowFullscreen = true;
            imageContainer.appendChild(iframe);
        }

        // Update text
        titleEl.textContent = data.title;
        dateEl.textContent = new Date(data.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        explanationEl.textContent = data.explanation;

    } catch (error) {
        console.error('APOD fetch error:', error);
        if (loadingEl) {
            loadingEl.innerHTML = '<span>Unable to load — check back later!</span>';
        }
        titleEl.textContent = 'Astronomy Picture of the Day';
        explanationEl.textContent = 'The NASA APOD API is temporarily unavailable. Try refreshing the page or visit apod.nasa.gov directly.';
    }
}
