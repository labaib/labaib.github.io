import { extractOggetto } from '/js/utils.js'

export function renderTopics(topics) {
    const listContainer = document.getElementById('topics-list');
    if (!listContainer) {
        console.warn(`renderTopics: container 'topics-list' non trovato`);
        return;
    }

    listContainer.innerHTML = '';

    if (!topics || topics.length === 0) {
        listContainer.innerHTML = '<p>Nessun topic trovato.</p>';
        return;
    }

    topics.forEach((d, index) => {
        const oggetto = extractOggetto(d.body);
        const bodyId = `topic-body-${index}`;

        const row = document.createElement('div');
        row.classList.add('topic-row');

        row.innerHTML = `
            <div class="topic-header d-flex justify-content-between align-items-start">
                <div class="topic-main">
                    <div class="topic-title">
                        <b>${d.title}</b>
                    </div>
                    ${oggetto ? `<div class="topic-subject">${oggetto}</div>` : ''}
                </div>

                <div class="topic-action d-flex gap-2">
                    <button class="btn btn-outline-secondary btn-sm topic-toggle"
                        data-toggle="${bodyId}">
                        Leggi
                    </button>

                    <a href="${d.html_url}" target="_blank"
                        class="btn btn-outline-primary btn-sm topic-open">
                        Apri
                    </a>
                </div>
            </div>

            <div id="${bodyId}" class="topic-body d-none mt-3">
                ${marked.parse(d.body)}
            </div>
            `;


        listContainer.appendChild(row);
    });

    // toggle espansione
    listContainer.querySelectorAll('.topic-toggle').forEach(btn => {
    btn.onclick = () => {
        const body = document.getElementById(btn.dataset.toggle);
        const isOpen = !body.classList.contains('d-none');

        body.classList.toggle('d-none');
        btn.textContent = isOpen ? 'Leggi' : 'Nascondi';
    };
});

}



