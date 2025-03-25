document.addEventListener("DOMContentLoaded", async () => {

    const url = "https://opensheet.elk.sh/1vtc4CzWBeKDzSckI1W9DgL-QN1GGCKeg9oLvTnvasek/"

    const body = document.getElementById('page_content')

    const listElement = document.createElement("ul")
    listElement.className = "list-group list-group-flush mx-5 w-100"

    const res = await fetch(url + "homepage");
    const data = await res.json();

    data.forEach(element => {
        let cardElement = document.createElement("div")
        cardElement.className = "col-12 col-md-6 col-lg-4 mb-3"
        cardElement.innerHTML = `
        <button class="btn p-0 w-100 border-0 bg-transparent">
            <div class="card rounded overflow-hidden text-center shadow">
                <div class="image"> 
                    <img src="./img/${element.Immagine}" class="rounded-circle mt-4" alt="Logo" style="width: 40%;">
                    <div class="card-body">
                        <h3 class="panel-title">${element.Nome}</h3>
                        <small>${element.Descrizione}</small><br>
                        <span class="badge badge-pill badge-primary" hidden>${element.Tag}</span>
                    </div>
                </div>
            </div>
        </button>
        `
        body.append(cardElement)
    });


    document.addEventListener('click', async (event) => {
 
        const button = event.target.closest('button');
        if (!button) return;

        body.innerHTML = ""
        listElement.innerHTML = ""

        const tag = button.querySelector('.badge');
        const apiUrl = `https://api.github.com/search/repositories?q=org:labaib+topic:${encodeURIComponent(tag.textContent.trim())}+fork%3Atrue&type=repositories`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        data.items.forEach((repo) => {

            let liElement = document.createElement("li")
            liElement.className = "list-group-item border-0"
            liElement.innerHTML = `
            <a href="${repo.homepage ? repo.homepage : repo.html_url}" target="_blank">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div class="flex-grow-1">
                                <h5 class="card-title">
                                    ${repo.name}
                                    <span class="badge bg-${repo.license.spdx_id ? 'success' : 'secondary'} mx-2">
                                        ${repo.license.spdx_id || "None"}
                                    </span>
                                </h5>
                                <p class="card-text text-muted">${repo.description || 'No description provided'}</p>
                            </div>
                        </div>
                        
                        <div class="d-flex flex-wrap align-items-center text-muted mt-2">
                            <div class="mx-1">
                                <i class="bi bi-star"></i>
                                ${repo.stargazers_count}
                            </div>
                            <div class="mx-1">
                                <i class="bi bi-diagram-2"></i>
                                ${repo.forks_count}
                            </div>
                            <div class="mx-3">
                                ${repo.language || 'N/A'}
                            </div>
                            <div>
                                <i class="bi bi-clock"></i>
                                <span>Updated <time datetime="${repo.updated_at}">${new Date(repo.updated_at).toLocaleDateString()}</time></span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            `
            listElement.append(liElement)

        })

        body.append(listElement)       
        
    })

})