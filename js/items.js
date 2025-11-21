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

async function buscaItem(id){
    const itens = await buscaItens();
    const item = itens.find((item, index) => index == id);
    preencheDadosItem(item);
}

function preencheDadosItem(item) {
    const classeItem = ".card-item__";
    document.querySelector(classeItem + "nome").textContent = item.name;
    document.querySelector(classeItem + "sprite").src = item.sprite;
    document.querySelector(classeItem + "classes").innerHTML = item.classes.map(classe => `${classe}`).join(', ');
    document.querySelector(classeItem + "raridade").textContent = `Raridade: ${item.rarity}`;
    document.querySelector(classeItem + "nivel-recomendado").textContent = `Nível Recomendado: ${item.recommended_level}`;
}

/**
 * Lista itens na tela.
 * Número máximo de itens a serem listados. Se -1, lista todos.
 */
async function listarItens(max = 10) {
    const itens = await buscaItens();
    const container = document.querySelector(".itens"); // Assumindo um container com a classe .itens
    if (!container) return;

    const itensParaListar = max === -1 ? itens : itens.slice(0, max);

    itensParaListar.forEach((item, index) => {
        const divItem = document.createElement("div");
        divItem.classList.add("card-item");
        divItem.innerHTML = `
            <a href="item.html?id=${index}">
                <img class="card-item__sprite" src="${item.sprite}" alt="${item.name}" width="32" height="32">
                <h3 class="card-item__nome">${item.name}</h3>
                <ul class="card-item__classes">
                ${item.classes.map(classe => `<li>${classe}</li>`).join(', ')}
                </ul>
            </a>
        `;
        container.appendChild(divItem);
    });
}