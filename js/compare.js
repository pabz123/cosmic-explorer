/**
 * Cosmic Explorer - Compare Page JavaScript
 * 
 * Renders the comparison table and handles column sorting.
 */

document.addEventListener('DOMContentLoaded', () => {
    renderCompareTable(PLANETS);
    initSortableHeaders();
});

let currentSortKey = 'position';
let currentSortDir = 'asc';

/* ---------- Render Table ---------- */
function renderCompareTable(planets) {
    const tbody = document.getElementById('compareBody');
    if (!tbody) return;

    tbody.innerHTML = planets.map(planet => `
        <tr class="${planet.slug === 'earth' ? 'earth-row' : ''}" id="compareRow_${planet.slug}">
            <td>
                <div class="planet-name-cell">
                    <span class="dot" style="background: ${planet.color};"></span>
                    <a href="planet.php?planet=${planet.slug}">${planet.name}</a>
                </div>
            </td>
            <td>${planet.type}</td>
            <td>${formatNumber(planet.diameter)}</td>
            <td>${planet.mass}</td>
            <td>${formatNumber(planet.distanceFromSun)}</td>
            <td>${planet.moons}</td>
            <td>${formatNumber(planet.orbitalPeriod)}</td>
            <td>${planet.gravity}</td>
        </tr>
    `).join('');
}

/* ---------- Sortable Headers ---------- */
function initSortableHeaders() {
    const headers = document.querySelectorAll('.compare-table th[data-sort]');

    headers.forEach(th => {
        th.addEventListener('click', () => {
            const key = th.dataset.sort;

            // Toggle direction if same key, otherwise default to asc
            if (key === currentSortKey) {
                currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc';
            } else {
                currentSortKey = key;
                currentSortDir = 'asc';
            }

            // Sort against a fresh copy so repeated clicks always start from canonical data
            const sorted = [...PLANETS].sort((a, b) => {
                let valA, valB;

                switch (key) {
                    case 'name':
                        valA = a.name;
                        valB = b.name;
                        return currentSortDir === 'asc' 
                            ? valA.localeCompare(valB) 
                            : valB.localeCompare(valA);
                    case 'type':
                        valA = a.type;
                        valB = b.type;
                        return currentSortDir === 'asc' 
                            ? valA.localeCompare(valB) 
                            : valB.localeCompare(valA);
                    case 'diameter':
                        valA = a.diameter;
                        valB = b.diameter;
                        break;
                    case 'mass':
                        valA = a.mass;
                        valB = b.mass;
                        break;
                    case 'distance':
                        valA = a.distanceFromSun;
                        valB = b.distanceFromSun;
                        break;
                    case 'moons':
                        valA = a.moons;
                        valB = b.moons;
                        break;
                    case 'orbital':
                        valA = a.orbitalPeriod;
                        valB = b.orbitalPeriod;
                        break;
                    case 'gravity':
                        valA = a.gravity;
                        valB = b.gravity;
                        break;
                    default:
                        valA = a.position;
                        valB = b.position;
                }

                // Numeric columns use arithmetic compare, while text columns return early above
                return currentSortDir === 'asc' ? valA - valB : valB - valA;
            });

            // Keep sort arrow state in sync with the active column for accessibility/clarity
            headers.forEach(h => {
                h.classList.remove('sorted');
                h.querySelector('.sort-arrow').textContent = '↕';
            });
            th.classList.add('sorted');
            th.querySelector('.sort-arrow').textContent = currentSortDir === 'asc' ? '↑' : '↓';

            renderCompareTable(sorted);
        });
    });
}
