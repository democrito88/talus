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

async function buscaMissao(id) {
    const missoes = await buscaMissoes();
    const missao = missoes.find((missao, index) => index == parseInt(id));
    if (missao) {
        preencheDadosMissao(missao);
    } else {
        console.error("Missão não encontrada");
    }
}

function preencheDadosMissao(missao) {
    const classeMissao = ".card-missao__";
    document.querySelector(classeMissao + "nome").textContent = missao.name;
    document.querySelector(classeMissao + "tipo").innerHTML = `<small class="badge"> ${missao.type}</small>`;
    document.querySelector(classeMissao + "descricao").textContent = missao.description;
    const atributosContainer = document.querySelector(classeMissao + "atributos");
    atributosContainer.innerHTML = `
        <li><strong>Level Mínimo:</strong> ${missao.attributes.recommended_level}</li>
        <li><strong>Local:</strong> ${missao.attributes.location}</li>
    `;
    const recompensasContainer = document.querySelector(classeMissao + "recompensas");
    recompensasContainer.innerHTML = missao.attributes.reward.map(reward => `<li>${reward}</li>`).join("");
}

/**
 * Lista missões na tela.
 * Número máximo de missões a serem listadas. Se -1, lista todas.
 */
async function listarMissoes(max = 10) {
    const missoes = await buscaMissoes();
    const container = document.querySelector(".missoes"); // Assumindo um container com a classe .missoes
    if (!container) return;

    const missoesParaListar = max === -1 ? missoes : missoes.slice(0, max);

    missoesParaListar.forEach((missao, index) => {
        const divMissao = document.createElement("div");
        divMissao.classList.add("card-missao");
        divMissao.innerHTML = `
            <a href="missao.html?id=${index}">
                <h3 class="card-missao__nome">${missao.name}  <small class="badge">${missao.type}</small></h3>
                <p><strong>Nível Mínimo:</strong> ${missao.attributes.recommended_level}</p>
            </a>
        `;
        container.appendChild(divMissao);
    });
}