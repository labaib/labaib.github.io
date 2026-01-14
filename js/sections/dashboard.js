import { getDiscussions } from '/js/api.js';
import { renderTopics } from '/js/sections/list.js';


export async function renderDashboard(items) {

    const discussions = await getDiscussions(100, 1);

    const container = document.getElementById('dashboard');
    container.innerHTML = '';

    console.log('Rendering main dashboard with items:', items);
    items.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-card';

        col.innerHTML = `
            <div class="card" style="background-color: ${item.color || '#fff'}">
                <a href="#${encodeURIComponent(item.name)}" class="stretched-link"></a>
            
                <span class="badge bg-primary badge-topics">
                    ${item.badge || '0'}
                </span>

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

        const topics = discussions.filter(
            d => d.category?.name === item.name
        );


        col.onclick = () =>  {
            const filteredTopics = topics.filter(t =>
                t.labels.some(l => l.name === item.title)
            );
            renderTopics(filteredTopics);
        }
            

        container.appendChild(col);
    });
}

