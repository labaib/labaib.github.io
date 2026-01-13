import { loadJSON } from '/js/utils.js';

// Render quick links
export async function renderQuickLinks() {
    const links = await loadJSON('/webconfig/quicklinks.json');
    const container = document.getElementById('quick-links');

    container.innerHTML = '';
    links.forEach(link => {
        const li = document.createElement('li');
        li.classList.add('nav-item');

        li.innerHTML = `
            <a class="nav-link px-3" href="${link.url}" target="_blank">
                ${link.label}
            </a>
        `;
        container.appendChild(li);
    });
}