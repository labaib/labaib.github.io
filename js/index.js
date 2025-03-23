document.addEventListener("DOMContentLoaded", async () => {

    const url = "https://opensheet.elk.sh/1vtc4CzWBeKDzSckI1W9DgL-QN1GGCKeg9oLvTnvasek/"

    const projectBtn = document.getElementById("project_btn")
    const eventBtn = document.getElementById("event_btn")
    const contactBtn = document.getElementById("contact_btn")

    const body = document.getElementById('page_content')

    const mainRow = document.getElementById('main_row')

    const listElement = document.createElement("ul")
    listElement.className = "list-group list-group-flush mx-5"

    const res = await fetch(url + "homepage");
    const data = await res.json();

    data.forEach(element => {
        let cardElement = document.createElement("div")
        cardElement.className = "col-12 col-md-6 col-lg-4 mb-3"
        cardElement.innerHTML = `
        <a href="${element.Link}" class="index-anchor">
            <div class="card rounded overflow-hidden text-center shadow">
                <div class="image"> 
                    <img src="./img/${element.Immagine}" class="rounded-circle mt-4" alt="Wikimedia Logo" style="width: 50%;">
                    <div class="card-body">
                        <h2 class="panel-title">${element.Tag}</h2>
                        <p>${element.Descrizione}</p>
                    </div>
                </div>
            </div>
        </a>
        `
        mainRow.append(cardElement)
    });


    projectBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        body.innerHTML = ""
        listElement.innerHTML = ""

        const response = await fetch(url + "progetti");
        const data = await response.json();

        data.forEach(element => {
            let liElement = document.createElement("li")
            liElement.className = "list-group-item mx-5"
            liElement.innerHTML = `
            <a href="${element.Link}"> <h2 class="mb-0">${element.Titolo}</h2></a>
            <small>${element.Data}</small>
            <p>${element.Descrizione}</p>
            `
            listElement.append(liElement)
        });

        body.append(listElement)
        
    });

    eventBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        body.innerHTML = ""
        listElement.innerHTML = ""

        const response = await fetch(url + "eventi");
        const data = await response.json();

        data.forEach(element => {
            let liElement = document.createElement("li")
            liElement.className = "list-group-item mx-5"
            liElement.innerHTML = `
            <a href="${element.Link}"> <h2 class="mb-0">${element.Titolo}</h2></a>
            <small>${element.Data}</small>
            <p>${element.Descrizione}</p>
            `
            listElement.append(liElement)
        });

        body.append(listElement)
        
    });

    contactBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        
        body.innerHTML = ""
        listElement.innerHTML = ""

        const response = await fetch(url + "contatti");
        const data = await response.json();

        data.forEach(element => {
            let liElement = document.createElement("li")
            liElement.className = "list-group-item mx-5"
            liElement.innerHTML = `
            <div class="card border-0 border-bottom">
                <a href="mailto:${element.Mail}"> <h3 class="mb-0">${element.Nome}</h3></a>
                <small>Mail</small>
            </div>
            `
            listElement.append(liElement)
        });

        body.append(listElement)

        
    });


})