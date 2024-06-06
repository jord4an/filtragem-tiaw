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
    // Coletar os rótulos dos checkboxes verdadeiros do primeiro conjunto
    const trueStates1 = [];
    const checkboxes1 = document.querySelectorAll('input[type="checkbox"].check1');
    checkboxes1.forEach((checkbox) => {
        if (checkbox.checked) {
            trueStates1.push(checkbox.nextElementSibling.textContent); // Adiciona o rótulo do checkbox aos trueStates1
        }
    });
    console.log(trueStates1);

    // Coletar os rótulos dos checkboxes verdadeiros do segundo conjunto
    const trueStates2 = [];
    const checkboxes2 = document.querySelectorAll('input[type="checkbox"].check2');
    checkboxes2.forEach((checkbox) => {
        if (checkbox.checked) {
            trueStates2.push(checkbox.nextElementSibling.textContent); // Adiciona o rótulo do checkbox aos trueStates2
        }
    });
    console.log(trueStates2);

    // Coletar os rótulos dos checkboxes verdadeiros do terceiro conjunto
    const trueStates3 = [];
    const checkboxes3 = document.querySelectorAll('input[type="checkbox"].check3');
    checkboxes3.forEach((checkbox) => {
        if (checkbox.checked) {
            trueStates3.push(checkbox.nextElementSibling.textContent); // Adiciona o rótulo do checkbox aos trueStates3
        }
    });
    console.log(trueStates3);

    // Filtra os dados com base nos valores selecionados nos filtros
    const filteredData = partidas.filter(partida => {
        // Se nenhum checkbox estiver selecionado em todos os conjuntos, retorna true para mostrar todos os cards
        if (trueStates1.length === 0 && trueStates2.length === 0 && trueStates3.length === 0) {
            return true;
        }

        // Verifica se pelo menos um rótulo dos checkboxes verdadeiros do primeiro conjunto está presente nas características da partida
        if (trueStates1.length > 0) {
            let matchFound1 = false;
            trueStates1.forEach((state) => {
                if (state.localeCompare(partida.endereco) === 0) {
                    matchFound1 = true;
                }
            });

            if (!matchFound1) {
                return false; // Retorna false se não houver correspondência no primeiro conjunto
            }
        }

        // Verifica se pelo menos um rótulo dos checkboxes verdadeiros do segundo conjunto está presente nas características da partida
        if (trueStates2.length > 0) {
            let matchFound2 = false;
            trueStates2.forEach((state) => {
                if (state.localeCompare(partida.escolhaEsporte) === 0) {
                    matchFound2 = true;
                }
            });

            if (!matchFound2) {
                return false; // Retorna false se não houver correspondência no segundo conjunto
            }
        }

        // Verifica se pelo menos um rótulo dos checkboxes verdadeiros do terceiro conjunto está presente nas características da partida
        if (trueStates3.length > 0) {
            let matchFound3 = false;
            trueStates3.forEach((state) => {
                if (state.localeCompare(partida.faixaIdade) === 0) {
                    matchFound3 = true;
                }
            });

            if (!matchFound3) {
                return false; // Retorna false se não houver correspondência no terceiro conjunto
            }
        }

        return true; // Retorna true se todas as condições forem atendidas
    });

    // Mostra as partidas filtradas no HTML
    main.innerHTML = '';

    filteredData.forEach((partida, index) => {
        const cardPartida = criarCardPartida(partida, index);
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




