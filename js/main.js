// Dinamic imports
import { renderMainDashboard, renderTaggedDashboard } from '/js/sections/dashboard.js';
import { renderQuickLinks } from '/js/sections/quicklinks.js';
import { getDiscussions } from '/js/api.js';
import { openSection } from './sections/list.js';

// Utils
import { loadJSON } from '/js/utils.js';

let categories = [];
let discussions = [];

document.addEventListener('DOMContentLoaded', async () => {

    categories = await loadJSON('/webconfig/categories.json');
    discussions = await getDiscussions(100, 1);

    await renderQuickLinks();
    handleHash();

    window.addEventListener('hashchange', handleHash);
});

function countTopics(categoryName) {
    return discussions.filter(
        d => d.category?.name === categoryName
    ).length;
}

function handleHash() {
    const hash = decodeURIComponent(location.hash.slice(1));

    clearViews();

    // 🟢 HOME
    if (!hash) {
        showDashboard();

        const dashboardItems = categories.map(c => ({
            ...c,
            title: c.name,
            badge: countTopics(c.name)
        }));

        renderMainDashboard(dashboardItems);
        return;
    }

    const category = categories.find(c => c.name === hash);

    // hash non valido → home
    if (!category) {
        location.hash = '';
        return;
    }

    hideDashboard();

    // 🔵 dashboard interna
    if (category.type === 'tag-dashboard') {
        renderTaggedDashboard(category, discussions);
        return;
    }

    // 🟣 LISTA SEMPLICE (Annunci ecc.)
    if (category.type === 'list') {
        openSection(category, discussions);
        return;
    }
}

function showDashboard() {
    document.getElementById('dashboard').style.display = '';
}

function hideDashboard() {
    document.getElementById('dashboard').style.display = 'none';
}

function clearViews() {
    document.getElementById('dashboard').innerHTML = '';
    document.getElementById('topics-container').innerHTML = '';
    document.getElementById('topics-list').innerHTML = '';
}
