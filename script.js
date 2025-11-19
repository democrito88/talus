const caminho_base = "./assets/json/";

function buscaCriaturas() {
    let retorno = null;
    fetch(caminho_base + "creatures.json")
    .then(resposta => resposta.json())
    .then(criaturas => {
        retorno = criaturas
        document.querySelector(".box").append(JSON.stringify(criaturas));
    })
    .catch(erro => {
        console.log(erro);
    });

    return retorno;
}

function buscaCriatura(id){
    const criaturas = buscaCriaturas();
    const criatura = criaturas.find((criatura, index) => index == id)
    document.querySelector(".box").append(JSON.stringify(criatura));
}

function buscaCriaturaPorNome(nome){
    const criaturas = buscaCriaturas();
    const criaturasFiltradas = criaturas.filter(criatura => criatura.name.contains(nome));
    document.querySelector(".box").append(JSON.stringify(criatura));
}

function preencheDadosCriatura(criatura){
    const classeCriatura = "card-criatura__";
    document.querySelector(classeCriatura + "nome").innerHTML = criatura.name;
    document.querySelector(classeCriatura + "sprite").src = criatura.sprite;
    document.querySelector(classeCriatura + "elementos").innerHTML = criatura.elements.map(elemento => {
        return `<li>${elemento}</li>`;
    }).join(" ");
    document.querySelector(append(JSON.stringify(criatura)));

}