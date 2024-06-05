const form = document.querySelector("form");
const nomeInput = document.querySelector("#nome-partida-user input");
const descricaoInput = document.querySelector("#cadastro-partidas textarea");
const enderecoInput = document.querySelector("#endereco input");

/**
 * Salva os dados no Local Storage do navegador e redireciona para a página de listagem de partidas.
 */
function salvarEEnviar() {
    let partida = {
        nome: nomeInput.value.trim(),
        descricao: descricaoInput.value.trim(),
        endereco: enderecoInput.value.trim(),
        faixaIdade: document.querySelector("#faixa-idade").value,
        escolhaEsporte: document.querySelector("#escolha-esporte").value,
        opcaoPagamento: document.querySelector("#opcao-pagamento").value
    };

    // Obtendo os dados de partidas já cadastradas
    let partidas = JSON.parse(localStorage.getItem("partidas")) || [];
    partidas.push(partida);
    
    // Salvando os dados no Local Storage
    localStorage.setItem("partidas", JSON.stringify(partidas));

    // Redirecionando para a página de listagem de partidas
    window.location.href = "listagem-partidas.html";
    }

// Adicionando um evento de clique ao botão salvar
document.getElementById("botao-salvar").addEventListener("click", salvarEEnviar);


