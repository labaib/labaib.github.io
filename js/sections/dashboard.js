import { getDiscussions } from '/js/api.js';
import { renderTopics } from '/js/sections/list.js';


async function renderDashboard({
    items,
    containerId = 'dashboard',
    onClick,
    getLink,
    showBadge = false
}) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    items.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-card';

        col.innerHTML = `
            <div class="card" style="background-color: ${item.color || '#fff'}">
                ${getLink
                    ? `<a href="${getLink(item)}" class="stretched-link"></a>`
                    : ''
                }

                ${showBadge
                    ? `<span class="badge bg-primary badge-topics">
                        ${item.badge || '0'}
                       </span>`
                    : ''
                }

                <div class="card-body text-center">
                    <div class="icon">${item.icon || ''}</div>
                    <div class="card-title mt-3">${item.title}</div>
                    ${item.description
                        ? `<p class="card-text mt-1">${item.description}</p>`
                        : ''
                    }
                </div>
            </div>
        `;

        if (onClick) {
            col.onclick = () => onClick(item);
        }

        container.appendChild(col);
    });

}

export async function renderMainDashboard(items) {
    const discussions = await getDiscussions(100, 1);
    renderDashboard({
        containerId: 'dashboard',
        items,
        getLink: c => `#${encodeURIComponent(c.name)}`,
        showBadge: true
    });
    
    renderTopics(discussions.reverse());
}


export async function renderTaggedDashboard(category) {
    const discussions = await getDiscussions(100, 1);

    // discussion della categoria
    const topics = discussions.filter(
        d => d.category?.name === category.name
    );
    console.log(topics)

    // estrai i tag (label GitHub)
    const tags = [...new Set(
        topics.flatMap(t => t.labels.map(l => l.name))
    )];

    const container = document.getElementById('topics-container');

    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="mb-0">${category.name}</h3>

            <div class="d-flex gap-2">
                <a href="#" class="btn btn-secondary">
                    ← Torna alla Dashboard
                </a>
            </div>
        </div>

        <div id="tag-dashboard" class="row g-4"></div>

    `;

    renderTopics(topics)

    // 🟢 dashboard a card dei tag
    renderDashboard({
        containerId: 'tag-dashboard',
        items: tags.map(tag => ({
            title: tag,
            icon: '🏷️',
            color: category.color
        })),
        onClick: item => {
            const filtered = topics.filter(t =>
                t.labels.some(l => l.name === item.title)
            );
            renderTopics(filtered);
        }
    });

}


