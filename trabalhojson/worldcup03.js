const url_partidas = 'https://worldcupjson.net/matches'

// função com parametro jogos ( uma array de objeto jogos ) - puxa o select do html de id equipe  
function Equipesjo(jogos) {
    const select = document.getElementById('equipe');
    // um conjunto set é criado para evitar duplicatas. para cada jogo na lista de jogos ele adiciona oo time da casa e o visitante.
    const equipes = new Set();
        jogos.forEach(jogo => {
            equipes.add(jogo.home_team_country);
            equipes.add(jogo.away_team_country);
        });
    
        // adiciona as opções ao select
        equipes.forEach(equipe => {
            const option = new Option(equipe, equipe);
            select.add(option);
        });
    }
    

    // função de mostrar os jogos escolhidos - pega o valor da equipe escolhida e verifica se realmente há algo, caso nao, sera notificado 
    function show_jogos() {
        let equipeEsco = document.getElementById('equipe').value;

        if (!equipeEsco){
        document.getElementById('result').innerHTML = 'Selecione uma equipe.';
        return;

    }
//Executa a requisição da API com fetch - cria uma variavel para os jogos filtrados (verifica se a equipe selecionada é participante de um jogo, sendo ele em casa oou visitante. se sim retorna a variavel jogo data)
        fetch(url_partidas)
         .then(response => response.json())
         .then(jogos => {  
            const jogosFiltrados = jogos.filter(jogo => {
                const jogoData = (equipeEsco === jogo.home_team_country) || (equipeEsco === jogo.away_team_country)
                return jogoData;
        });

        // Chama a função mostrarJogos, passando a lista de jogos filtrados.
        mostrarJogos(jogosFiltrados);
    })
    // catch serve para 'capturar um erro' e exibir uma mensagem de erro na div. 
    .catch(error => {
        console.error('Erro ao carregar os jogos:', error);
        document.getElementById('result').innerHTML = 'Erro ao carregar os jogos.';
    });

}
// função de mostrar os jogos. primeiro cria uma variavel result que puxa a div result do html. depois limpa a div, caso tenha alguma informação la.
function mostrarJogos(jogosFiltrados) {
    const result = document.getElementById('result');
    result.innerHTML = '';
    // caso não tenha algo escrito na variavel de jogos filtrados, nenhuma partida existe para a equipe selecionada
    if (jogosFiltrados.length === 0) {
        result.innerHTML = 'Nenhuma partida para a equipe selecionada';
        return;
    }

    // para cada jogo na lista de jogos filtrados, é criado uma div. dentro dessa div, há os dados da partida.
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
        // junta a div criada anteriormente ao elemento result
        result.appendChild(div);
    });
}
    //Faz uma requisição para obter dados dos jogos, processa a resposta JSON, 
    //passa os dados para a função Equipesjo, que se encarrega de atualizar uma lista suspensa com equipes. Erros são tratados e registrados no console.
    fetch(url_partidas)
        .then(response => response.json())
        .then(jogos => {
            Equipesjo(jogos);
        })
        .catch(error => {
            console.error('Erro ao carregar dados para o select:', error);
        });