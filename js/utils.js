// Carica JSON esterni
export async function loadJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Errore caricamento JSON: ${url}`);
    return await res.json();
}

// Estrai oggetto dall'annuncio
export function extractOggetto(body) {
    if (!body) return null;

    const match = body.match(/###\s*Oggetto dell’annuncio\s*\n+([^\n]+)/i);
    return match ? match[1].trim() : null;
}




