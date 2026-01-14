import { renderTopics } from '/js/sections/list.js';

export function renderTags(category, discussions) {

    const container = document.getElementById('tag-dashboard');
    if (!container) {
        console.error('Errore: tag-dashboard non trovato!');
        return;
    }

    container.innerHTML = '';

    const topics = discussions.filter(
        d => d.category?.name === category.name
    );

    // estrai i tag (label GitHub)
    const tags = [...new Set(
        topics.flatMap(t => t.labels.map(l => l.name))
    )];

    tags.forEach(tag => {
        const badge = document.createElement('span');
        badge.className = 'badge tag-badge';
        badge.textContent = tag;

        badge.onclick = () => {
            // stato attivo
            container
                .querySelectorAll('.tag-badge')
                .forEach(b => b.classList.remove('active'));

            badge.classList.add('active');

            const filteredTopics = topics.filter(t =>
                t.labels.some(l => l.name === tag)
            );

            renderTopics(filteredTopics);
        };

        container.appendChild(badge);
        
    });
}