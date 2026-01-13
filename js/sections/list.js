import { extractOggetto } from '/js/utils.js';

export function openSection(category, discussions) {

    const container = document.getElementById('topics-container');
    if (!container) {
        console.error('Errore: topics-container non trovato!');
        return;
    }

    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="mb-0">${category.name}</h3>

            <div class="d-flex gap-2">
                <a href="#" class="btn btn-secondary">
                    ← Torna alla Dashboard
                </a>
                <a
                    type="button"
                    class="btn btn-success"
                    href="https://github.com/labaib/labaib.github.io/discussions/new?category=${category.name.toLowerCase()}"
                >
                    📝 ${category.name === 'Q&A'
                        ? 'Nuova domanda'
                        : category.name === 'Votazioni'
                        ? 'Nuova votazione'
                        : 'Nuova discussione'}
                </a>
            </div>
        </div>

    `;

    const topics = discussions.filter(
        d => d.category?.name === category.name
    );
    renderTopics(topics);
}

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

