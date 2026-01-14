// Dinamic imports
import { renderQuickLinks } from '/js/sections/quicklinks.js';
import { getDiscussions } from '/js/api.js';
import { handleHash } from '/js/router.js';

// Utils
import { loadJSON } from '/js/utils.js';

let categories = [];
let discussions = [];

document.addEventListener('DOMContentLoaded', async () => {

    categories = await loadJSON('/webconfig/categories.json');
    discussions = await getDiscussions(100, 1);

    await renderQuickLinks();
    handleHash(categories, discussions);

    window.addEventListener('hashchange', () => handleHash(categories, discussions));

});