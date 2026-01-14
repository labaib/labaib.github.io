

export function renderNav(category) {

    const container = document.getElementById('nav-container');
    if (!container) {
        console.error('Errore: nav-container non trovato!');
        return;
    }

    container.innerHTML = `
        <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
            <!-- Titolo -->
            <h3 class="mb-0">${category.name}</h3>

            <!-- Bottoni -->
            <div class="d-flex flex-column flex-sm-row gap-2">
                <a href="#" class="btn btn-secondary">
                    ← Torna alla Dashboard
                </a>
                <a
                    type="button"
                    class="btn btn-success"
                    href="https://github.com/labaib/labaib.github.io/discussions/new?category=${category.name.toLowerCase()}"
                >
                    📝 ${category.name === 'Q&A'
                        ? 'Nuova domanda'
                        : category.name === 'Votazioni'
                        ? 'Nuova votazione'
                        : 'Nuova discussione'}
                </a>
            </div>
        </div>

    `;

}