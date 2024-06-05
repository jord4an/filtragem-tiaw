// Função para criar um card de partida
let partidas;

function criarCardPartida(partida, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    const nomePartida = document.createElement('h2');
    nomePartida.textContent = partida.nome;
    card.appendChild(nomePartida);

    const escolhaEsporte = document.createElement('p');
    escolhaEsporte.textContent = 'Esporte: ' + partida.escolhaEsporte;
    card.appendChild(escolhaEsporte);

    const endereco = document.createElement('p');
    endereco.textContent = 'Endereço: ' + partida.endereco;
    card.appendChild(endereco);

    const faixaEtaria = document.createElement('p');
    faixaEtaria.textContent = 'Faixa Etária: ' + partida.faixaIdade;
    card.appendChild(faixaEtaria);

    const descricao = document.createElement('p');
    descricao.textContent = 'Descrição: ' + partida.descricao;
    card.appendChild(descricao);

    const botaoMostrar = document.createElement('button');
    botaoMostrar.textContent = 'Ver Detalhes';
    botaoMostrar.id = 'mostrar-partida';
    botaoMostrar.setAttribute('data-index', index); // Define o índice da partida como um atributo do botão
    botaoMostrar.addEventListener('click', function () {
        // Salva o índice da partida no localStorage
        localStorage.setItem('partidaIndex', this.getAttribute('data-index'));
        // Redireciona para a página de detalhes
        window.location.href = 'detalhes-partida.html';
    });
    card.appendChild(botaoMostrar);

    return card;
}

// Função para atualizar a listagem de partidas
function atualizarListagem() {
    partidas = JSON.parse(localStorage.getItem('partidas')) || [];
    const main = document.querySelector('main');
    main.innerHTML = ''; // Limpa o conteúdo atual antes de adicionar novos cards

    partidas.forEach((partida, index) => {
        const cardPartida = criarCardPartida(partida, index);
        main.appendChild(cardPartida);
    });
}


const cardContainer = document.getElementById("card");
const faixaEtariaFilter = document.getElementById("faixaEtaria")
const esporteFilter = document.getElementById("esporte");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const applyFilterBtn = document.getElementById("applyFilter");
const main = document.querySelector('main');
const clearFilterBtn = document.getElementById('clearFilters');


applyFilterBtn.addEventListener("click", applyFilter);

// Adiciona event listeners para cada checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyFilter);
});

// Função para aplicar o filtro
function applyFilter() {
    // Filtra os dados com base nos valores selecionados nos filtros
    // Filtra os dados com base nos valores selecionados nos filtros
    const filteredData = partidas.filter(jogador => {
        // Verifica se a faixa etária selecionada corresponde à do jogador
        if (faixaEtariaFilter.value && jogador.faixaIdade !== faixaEtariaFilter.value) {
            return false; // Retorna false se não corresponder
        }

        // Verifica se o esporte selecionado corresponde ao do jogador
        if (esporteFilter.value && jogador.escolhaEsporte !== esporteFilter.value) {
            return false; // Retorna false se não corresponder
        }

        // Verifica se todos os checkboxes marcados correspondem às características do jogador
        for (const checkbox of checkboxes) {
            if (checkbox.checked && !jogador.caracteristicas.includes(checkbox.getAttribute('value'))) {
                return false; // Retorna false se uma característica não corresponder
            }
        }

        return true; // Retorna true se todas as condições forem atendidas
    });

    console.log(filteredData );

    // Mostra os pets filtrados

    filteredData.forEach((partida, index) => {
        const cardPartida = criarCardPartida(partida, index);
        main.innerHTML = '';
        main.appendChild(cardPartida);
    });
}

function clearFilters() {
    // Limpa o valor dos campos de filtro
    faixaEtariaFilter.value = '';
    esporteFilter.value = '';

    // Desmarca todos os checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Aplica o filtro novamente para mostrar todos os dados
    atualizarListagem();
}

clearFilterBtn.addEventListener("click", clearFilters);




