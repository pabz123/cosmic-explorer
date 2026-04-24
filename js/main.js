/**
 * Cosmic Explorer - Main JavaScript
 * 
 * Shared logic used across all pages:
 * - Star field background generation
 * - Theme toggle (dark/light) with localStorage
 * - Mobile navigation toggle
 * - Scroll effects (header shadow, reveal animations)
 * - Navbar scroll behavior
 */

document.addEventListener('DOMContentLoaded', () => {
    initStarField();
    initThemeToggle();
    initMobileNav();
    initScrollEffects();
    initFlashAutoDismiss();
});

/* ---------- Star Field Background ---------- */
function initStarField() {
    const container = document.getElementById('starsBg');
    if (!container) return;

    const starCount = 200;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2.5 + 0.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 3;
        const opacity = Math.random() * 0.7 + 0.3;

        star.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            opacity: ${opacity};
            animation: twinkle ${duration}s ease-in-out ${delay}s infinite;
        `;
        fragment.appendChild(star);
    }
    container.appendChild(fragment);

    // Add twinkle animation if not already defined
    if (!document.getElementById('twinkleStyle')) {
        const style = document.createElement('style');
        style.id = 'twinkleStyle';
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: var(--star-opacity, 0.3); transform: scale(1); }
                50% { opacity: 1; transform: scale(1.3); }
            }
        `;
        document.head.appendChild(style);
    }
}

/* ---------- Theme Toggle ---------- */
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('cosmicTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('cosmicTheme', next);
    });
}

/* ---------- Mobile Navigation ---------- */
function initMobileNav() {
    const toggleBtn = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close nav when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
            toggleBtn.classList.remove('open');
            navLinks.classList.remove('open');
        }
    });
}

/* ---------- Scroll Effects ---------- */
function initScrollEffects() {
    const header = document.getElementById('siteHeader');

    // Header shadow on scroll
    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }
    });

    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/* ---------- Flash Message Auto-dismiss ---------- */
function initFlashAutoDismiss() {
    const flash = document.getElementById('flashMessage');
    if (flash) {
        setTimeout(() => {
            flash.style.opacity = '0';
            flash.style.transform = 'translateX(30px)';
            setTimeout(() => flash.remove(), 400);
        }, 5000);
    }
}

/* ---------- Helper: Animate Counter ---------- */
function animateCounter(element, target, duration = 1500) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * eased);

        element.textContent = formatNumber(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

/* ---------- Helper: Generate Planet Gradient ---------- */
function getPlanetGradient(color) {
    return `radial-gradient(circle at 35% 35%, ${color}dd, ${color}88, ${color}33, transparent)`;
}
