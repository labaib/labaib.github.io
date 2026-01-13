import { renderTopics } from '/js/sections/list.js';

// Carica JSON esterni
export async function loadJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Errore caricamento JSON: ${url}`);
    return await res.json();
}

export function openSection(category, discussions) {

    const container = document.getElementById('topics-container');
    if (!container) {
        console.error('Errore: topics-container non trovato!');
        return;
    }

    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="mb-0">${category.name}</h3>

            <a href="#" class="btn btn-secondary">
                ← Torna alla Dashboard
            </a>
        </div>

    `;

    const topics = discussions.filter(
        d => d.category?.name === category.name
    );
    renderTopics(topics);
}


export function extractOggetto(body) {
    if (!body) return null;

    const match = body.match(/###\s*Oggetto dell’annuncio\s*\n+([^\n]+)/i);
    return match ? match[1].trim() : null;
}




