const form = document.querySelector("form");
const nomeInput = document.querySelector("#nome-partida-user input");
const descricaoInput = document.querySelector("#cadastro-partidas textarea");
const enderecoInput = document.querySelector("#endereco input");

/**
 * Salva os dados no Local Storage do navegador e redireciona para a página de listagem de partidas.
 */
function salvarEEnviar() {
    // Coletar os checkboxes verdadeiros
    const trueStates = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"].check1');
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            trueStates.push({
                label: checkbox.nextElementSibling.textContent
            });
        }
    });

    // Criar o objeto de partida
    let partida = {
        nome: nomeInput.value.trim(),
        descricao: descricaoInput.value.trim(),
        endereco: enderecoInput.value.trim(),
        faixaIdade: document.querySelector("#faixa-idade").value,
        escolhaEsporte: document.querySelector("#escolha-esporte").value,
        opcaoPagamento: document.querySelector("#opcao-pagamento").value,
        checkboxesVerdadeiros: trueStates
    };

    // Salvar os dados no Local Storage
    let partidas = JSON.parse(localStorage.getItem("partidas")) || [];
    partidas.push(partida);
    localStorage.setItem("partidas", JSON.stringify(partidas));

    // Redirecionar para a página de listagem de partidas
     window.location.href = "listagem-partidas.html";
}

// Adicionando um evento de clique ao botão salvar
document.getElementById("botao-salvar").addEventListener("click", salvarEEnviar);


