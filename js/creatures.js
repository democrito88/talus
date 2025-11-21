const caminho_base = "./assets/json/";

async function buscaCriaturas() {
    let resultado = await fetch(caminho_base + "creatures.json");
    let json = await resultado.json();
    return json;
}

async function buscaCriatura(id){
    const criaturas = await buscaCriaturas();
    const criatura = criaturas.find((criatura, index) => index == id)
    preencheDadosCriatura(criatura);
}

function buscaCriaturaPorNome(nome){
    const criaturas = buscaCriaturas();
    const criaturasFiltradas = criaturas.filter(criatura => criatura.name.contains(nome));
    document.querySelector(".box").append(JSON.stringify(criatura));
}

function preencheDadosCriatura(criatura){
    const classeCriatura = ".card-criatura__";
    document.querySelector(classeCriatura + "nome").innerHTML = criatura.name;
    document.querySelector(classeCriatura + "sprite").src = criatura.sprite;
    document.querySelector(classeCriatura + "elementos").innerHTML = `
    <li><i class="bi bi-arrow-up"></i>${criatura.elements.resist}</li>
    <li><i class="bi bi-arrow-down"></i>${criatura.elements.weak}</li>
    `;
    document.querySelector(classeCriatura + "atributos").innerHTML = `
    <li>Classe: ${criatura.class}</li>
    <li>HP: ${criatura.hp}</li>
    <li>Nível recomendado: ${criatura.recommended_level}</li>
    `;
}

/* Listar criaturas na tela
    max: número máximo de criaturas a serem listadas
    se max não for informado, o padrão será 10
    se max = -1, todas as criaturas serão listadas
 */
async function listarCriaturas(max = 10){
    const criaturas = await buscaCriaturas();
    criaturas.forEach(async (criatura, index) => {
        if(index > max && max !== -1) return;

        const divCriatura = document.createElement("div");
        divCriatura.classList.add("card-criatura");
        divCriatura.innerHTML = `
            <a href="criatura.html?id=${index}">
                <img class="card-criatura__sprite" src="${criatura.sprite}" alt="${criatura.name}"
                width="64">
                <h3 class="card-criatura__nome">${criatura.name}</h3>
                <ul class="card-criatura__elementos" style="list-style-type: none; padding: 0;">
                    <li><i class="bi bi-arrow-up"></i>${criatura.elements.resist}</li>
                    <li><i class="bi bi-arrow-down"></i>${criatura.elements.weak}</li>
                </ul>
            </a>
        `;
        document.querySelector(".criaturas").appendChild(divCriatura);
    });
}