const caminho_base_pasta = "./assets/json/";

async function buscaItens() {
    try {
        const resultado = await fetch(caminho_base_pasta + "items.json");
        if (!resultado.ok) {
            throw new Error(`HTTP error! status: ${resultado.status}`);
        }
        return await resultado.json();
    } catch (error) {
        console.error("Falha ao buscar itens:", error);
        return [];
    }
}

async function buscaItemPorNome(nome) {
    const itens = await buscaItens();
    return itens.filter(item => item.name.toLowerCase().includes(nome.toLowerCase()));
}

function preencheDadosItem(item) {
    const classeItem = ".card-item__";
    document.querySelector(classeItem + "nome").textContent = item.name;
    document.querySelector(classeItem + "sprite").src = item.sprite;
    document.querySelector(classeItem + "descricao").textContent = item.description;
    // Adicione outros campos conforme a estrutura do seu JSON de itens
}

/**
 * Lista itens na tela.
 * @param {number} [max=10] - Número máximo de itens a serem listados. Se -1, lista todos.
 */
async function listarItens(max = 10) {
    const itens = await buscaItens();
    const container = document.querySelector(".itens"); // Assumindo um container com a classe .itens
    if (!container) return;

    const itensParaListar = max === -1 ? itens : itens.slice(0, max);

    itensParaListar.forEach(item => {
        const divItem = document.createElement("div");
        divItem.classList.add("card-item");
        divItem.innerHTML = `
            <img class="card-item__sprite" src="${item.sprite}" alt="${item.name}" width="32" height="32">
            <h3 class="card-item__nome">${item.name}</h3>
            <p class="card-item__descricao">${item.type}</p>
        `;
        container.appendChild(divItem);
    });
}