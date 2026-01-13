import { extractOggetto } from '/js/utils.js';

export function renderTopics(topics, containerId = 'topics-list') {
    const listContainer = document.getElementById(containerId);
    if (!listContainer) {
        console.warn(`renderTopics: container '${containerId}' non trovato`);
        return;
    }

    listContainer.innerHTML = '';

    if (!topics || topics.length === 0) {
        listContainer.innerHTML = '<p>Nessun topic trovato.</p>';
        return;
    }

    console.log('Rendering topics:', topics);

    topics.forEach(d => {
        const oggetto = extractOggetto(d.body);

        const row = document.createElement('div');
        row.classList.add('topic-row');
        row.innerHTML = `
        <div>
            <div class="topic-title" onclick="window.open('${d.html_url}', '_blank')">
                ${d.title}
            </div>
            ${oggetto ? `<div class="topic-subject">${oggetto}</div>` : ''}
        </div>
        <div class="topic-action">
            <a href="${d.html_url}" target="_blank" class="btn btn-outline-primary">Apri</a>
        </div>
        `;
        listContainer.appendChild(row);
    });
}

