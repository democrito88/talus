const caminho_base_pasta_json = "./assets/json/";

async function buscaMissoes() {
    try {
        const resultado = await fetch(caminho_base_pasta_json + "missions.json");
        if (!resultado.ok) {
            throw new Error(`HTTP error! status: ${resultado.status}`);
        }
        return await resultado.json();
    } catch (error) {
        console.error("Falha ao buscar missões:", error);
        return [];
    }
}

async function buscaMissaoPorNome(nome) {
    const missoes = await buscaMissoes();
    return missoes.filter(missao => missao.name.toLowerCase().includes(nome.toLowerCase()));
}

function preencheDadosMissao(missao) {
    const classeMissao = ".card-missao__";
    document.querySelector(classeMissao + "nome").textContent = missao.name;
    document.querySelector(classeMissao + "tipo").textContent = `Tipo: ${missao.type}`;
    document.querySelector(classeMissao + "descricao").textContent = missao.description;
    document.querySelector(classeMissao + "level").textContent = `Level Mínimo: ${missao.attributes.recommended_level}`;
    // Adicione outros campos conforme necessário
}

/**
 * Lista missões na tela.
 * @param {number} [max=10] - Número máximo de missões a serem listadas. Se -1, lista todas.
 */
async function listarMissoes(max = 10) {
    const missoes = await buscaMissoes();
    const container = document.querySelector(".missoes"); // Assumindo um container com a classe .missoes
    if (!container) return;

    const missoesParaListar = max === -1 ? missoes : missoes.slice(0, max);

    missoesParaListar.forEach(missao => {
        const divMissao = document.createElement("div");
        divMissao.classList.add("card-missao");
        divMissao.innerHTML = `
            <h3 class="card-missao__nome">${missao.name}</h3>
            <p class="card-missao__descricao">${missao.description}</p>
            <ul class="card-missao__detalhes" style="list-style-type: none; padding: 0;">
                <li><strong>Tipo:</strong> ${missao.type}</li>
                <li><strong>Level Mínimo:</strong> ${missao.attributes.recommended_level}</li>
                <li><strong>Local:</strong> ${missao.attributes.location}</li>
            </ul>
        `;
        container.appendChild(divMissao);
    });
}