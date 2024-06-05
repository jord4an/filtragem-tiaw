// Função para carregar os detalhes da partida na página de detalhes
function carregarDetalhesPartida() {
    // Recupera o índice da partida do localStorage
    const index = localStorage.getItem('partidaIndex');
    const partidas = JSON.parse(localStorage.getItem('partidas')) || [];
    console.log("partidas: ", partidas);
    const partida = partidas[index];

    // Preenche os campos do formulário com os dados da partida
    document.querySelector('#nome-partida-user input').value = partida.nome;
    document.querySelector('#cadastro-partidas textarea').value = partida.descricao;
    document.querySelector('#endereco input').value = partida.endereco;
    document.querySelector('#faixa-idade').value = partida.faixaIdade;
    document.querySelector('#escolha-esporte').value = partida.escolhaEsporte;
    document.querySelector('#opcao-pagamento').value = partida.opcaoPagamento;

    // Desabilita os campos para que sejam apenas leitura
    document.querySelectorAll('input, select, textarea').forEach(campo => {
        if(campo.tagName === 'SELECT') {
            campo.disabled = true;
        } else {
            campo.readOnly = true;
        }
    });

    // Marca os checkboxes conforme os dados salvos
    ['checkbox-1', 'checkbox-2', 'checkbox-3', 'checkbox-4', 'checkbox-5'].forEach((id, index) => {
        document.getElementById(id).checked = partida.checklist[index];
        document.getElementById(id).disabled = true; // Desabilita os checkboxes
    });
}

// Função para habilitar a edição dos campos
function enableEditing() {
    document.querySelectorAll('input, select, textarea').forEach(campo => {
        if(campo.tagName === 'SELECT') {
            campo.disabled = false;
        } else {
            campo.readOnly = false;
        }
    });
    ['checkbox-1', 'checkbox-2', 'checkbox-3', 'checkbox-4', 'checkbox-5'].forEach((id) => {
        document.getElementById(id).disabled = false; // Habilita os checkboxes
    });

    document.getElementById('edit-button').style.display = 'none';
    document.getElementById('save-button').style.display = 'inline';
}

// Função para salvar as alterações
function saveChanges() {
    const index = localStorage.getItem('partidaIndex');
    const partidas = JSON.parse(localStorage.getItem('partidas')) || [];
    const partida = partidas[index];

    // Atualiza os dados da partida com os valores dos campos
    partida.nome = document.querySelector('#nome-partida-user input').value;
    partida.descricao = document.querySelector('#cadastro-partidas textarea').value;
    partida.endereco = document.querySelector('#endereco input').value;
    partida.faixaIdade = document.querySelector('#faixa-idade').value;
    partida.escolhaEsporte = document.querySelector('#escolha-esporte').value;
    partida.opcaoPagamento = document.querySelector('#opcao-pagamento').value;
    partida.checklist = [
        document.getElementById('checkbox-1').checked,
        document.getElementById('checkbox-2').checked,
        document.getElementById('checkbox-3').checked,
        document.getElementById('checkbox-4').checked,
        document.getElementById('checkbox-5').checked
    ];

    // Salva os dados atualizados no localStorage
    partidas[index] = partida;
    localStorage.setItem('partidas', JSON.stringify(partidas));

    // Desabilita novamente os campos
    document.querySelectorAll('input, select, textarea').forEach(campo => {
        if(campo.tagName === 'SELECT') {
            campo.disabled = true;
        } else {
            campo.readOnly = true;
        }
    });
    ['checkbox-1', 'checkbox-2', 'checkbox-3', 'checkbox-4', 'checkbox-5'].forEach((id) => {
        document.getElementById(id).disabled = true; // Desabilita os checkboxes
    });

    document.getElementById('edit-button').style.display = 'inline';
    document.getElementById('save-button').style.display = 'none';
}

// Chama a função carregarDetalhesPartida quando a página de detalhes é carregada
document.addEventListener('DOMContentLoaded', carregarDetalhesPartida);
