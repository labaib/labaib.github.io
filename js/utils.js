// Carica JSON esterni
export async function loadJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Errore caricamento JSON: ${url}`);
    return await res.json();
}

export function countTopics(discussions, categoryName) {
    return discussions.filter(
        d => d.category?.name === categoryName
    ).length;
}

export function extractTopics(discussions, categoryName) {
    return discussions.filter(
        d => d.category?.name === categoryName
    );
}

export function getTags(discussions, categoryName) {
    const topics = extractTopics(discussions, categoryName);

    const tags = [...new Set(
        topics.flatMap(t => t.labels.map(l => l.name))
    )];
    const items = tags.map(tag => ({
                    title: tag,
                    icon: '🏷️',
                    color: category.color
                }))
}

export function showDashboard() {
    document.getElementById('dashboard').style.display = '';
}

export function hideDashboard() {
    document.getElementById('dashboard').style.display = 'none';
}

export function clearViews() {
    document.getElementById('dashboard').innerHTML = '';
    document.getElementById('nav-container').innerHTML = '';
    document.getElementById('tag-dashboard').innerHTML = '';
    document.getElementById('topics-list').innerHTML = '';
}

// Estrai oggetto dall'annuncio
export function extractOggetto(body) {
    if (!body) return null;

    const match = body.match(/###\s*Oggetto dell’annuncio\s*\n+([^\n]+)/i);
    return match ? match[1].trim() : null;
}




