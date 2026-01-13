// api.js
// Gestione delle chiamate REST API GitHub Discussions
// Tutte le funzioni sono async e restituiscono JSON

const OWNER = 'labaib';
const REPO = 'labaib.github.io';

// Headers Guithub API
const HEADERS = {
    'Accept': 'application/vnd.github+json'
};

/**
 * 1️⃣ Lista delle discussion del repository
 * @param {number} perPage - numero di discussion per pagina (default 30)
 * @param {number} page - pagina da richiedere (default 1)
 * @returns {Promise<Array>} array di discussion
 */
export async function getDiscussions(perPage = 30, page = 1) {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/discussions?per_page=${perPage}&page=${page}`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`Errore fetch discussions: ${res.status}`);
    return res.json();
}

/**
 * 2️⃣ Dettaglio di una singola discussion
 * @param {number} discussionNumber - numero della discussion
 * @returns {Promise<Object>} oggetto della discussion
 */
export async function getDiscussion(discussionNumber) {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/discussions/${discussionNumber}`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`Errore fetch discussion ${discussionNumber}: ${res.status}`);
    return res.json();
}

/**
 * 3️⃣ Lista delle categorie (sezioni)
 * @returns {Promise<Array>} array di categorie
 */
export async function getCategories() {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/discussions/categories`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`Errore fetch categories: ${res.status}`);
    return res.json();
}

/**
 * 4️⃣ Lista dei label del repository
 * @returns {Promise<Array>} array di label
 */
export async function getLabels() {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/labels`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`Errore fetch labels: ${res.status}`);
    return res.json();
}

