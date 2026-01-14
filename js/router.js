import { countTopics, showDashboard, hideDashboard, clearViews } from '/js/utils.js';
import { renderDashboard } from '/js/sections/dashboard.js';
import { renderTags } from './sections/tags.js';
import { renderNav } from './sections/nav.js';
import { renderTopics } from '/js/sections/list.js';


export function handleHash(categories, discussions) {

    const hash = decodeURIComponent(location.hash.slice(1));

    clearViews();

    // 🟢 HOME
    if (!hash) {
        showDashboard();

        const dashboardItems = categories.map(c => ({
            ...c,
            title: c.name,
            badge: countTopics(discussions, c.name)
        }));

        renderDashboard(dashboardItems);
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
        renderNav(category);
        renderTags(category, discussions);
        renderTopics(
            discussions.filter(d => d.category?.name === category.name)
        );
        return;
    }

    if (category.type === 'list') {
        renderNav(category);
        renderTopics(
            discussions.filter(d => d.category?.name === category.name)
        );
        return;
    }

}