const url_jogos = 'https://worldcupjson.net/matches'

function Dataas(jogos) {
    const select = document.getElementById('data');
    const Datas = [...new Set(jogos.map(jogo => new Date(jogo.datetime).toISOString().split('T')[0]))];

    Datas.forEach(data => {
        const option = new Option(data, data);
        select.add(option);
    });
    
}

function show_jogos() {
    let dataEsco = document.getElementById('data').value;

    if (!dataEsco){
        document.getElementById('result').innerHTML = 'Selecione uma data.';
        return;

    }

    fetch(url_jogos)
    .then(response => response.json())
    .then(jogos => {  
        const jogosFiltrados = jogos.filter(jogo => {
            const jogoData = new Date(jogo.datetime).toISOString().split('T')[0];
            return jogoData === dataEsco;
        });

        mostrarJogos(jogosFiltrados);
    })
    .catch(error => {
        console.error('Erro ao carregar os jogos:', error);
        document.getElementById('result').innerHTML = 'Erro ao carregar os jogos.';
    });

}

function mostrarJogos(jogosFiltrados) {
    const result = document.getElementById('result');
    result.innerHTML = '';

    if (jogosFiltrados.length === 0) {
        result.innerHTML = 'Nenhuma partida para a data selecionada';
        return;
    }

    jogosFiltrados.forEach(jogo => {
        const div = document.createElement('div');
        div.innerHTML = `
            <hr>#${jogo.id} <br>
            Data e hora: ${jogo.datetime} <br>
            Time da casa: ${jogo.home_team.country} <br>
            Time de fora: ${jogo.away_team.country} <br>
            Estádio: ${jogo.venue} <br>
            Placar: ${jogo.home_team.goals} - ${jogo.away_team.goals} <br><hr>
        `;
        result.appendChild(div);
    });
}

fetch(url_jogos)
    .then(response => response.json())
    .then(jogos => {
        Dataas(jogos);
    })
    .catch(error => {
        console.error('Erro ao carregar dados para o select:', error);
    });