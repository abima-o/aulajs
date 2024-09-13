//criamos uma constante que carregará a URL para a API que fornece os dados dos jogos
const url_jogos = 'https://worldcupjson.net/matches'

function Dataas(jogos) {
//obtém o elemento <select> com o id data do DOM e o armazena na constante select
    const select = document.getElementById('data');
//cria uma array Datas contendo todas as datas únicas dos jogos. primeiro, extrai as datas dos jogos, converte para o formato ISO e depois remove duplicatas usando o new Set
    const Datas = [...new Set(jogos.map(jogo => new Date(jogo.datetime).toISOString().split('T')[0]))];
//itera sobre cada data única na lista Datas
    Datas.forEach(data => {
//cria um novo elemento <option> para cada data, onde o valor e o texto são ambos a data.
        const option = new Option(data, data);
//adiciona o novo elemento <option> ao <select>
        select.add(option);
    });
    
}
//função definida para mostrar os jogos com base na escolha da data feita pelo usuário
function show_jogos() {
    let dataEsco = document.getElementById('data').value;
//verifica se o usuário selecionou uma data. se não, exibe uma mensagem de erro e retorna para interromper a execução da função
    if (!dataEsco){
        document.getElementById('result').innerHTML = 'Selecione uma data.';
        return;

    }
//recebe os dados da URL armazenada na constante url_jogos
    fetch(url_jogos)
    .then(response => response.json())
    .then(jogos => {  
//filtra os jogos para obter apenas aqueles que correspondem à data selecionada
        const jogosFiltrados = jogos.filter(jogo => {
//extrai a data dos jogos e coloca formato YYYY-MM-DD
            const jogoData = new Date(jogo.datetime).toISOString().split('T')[0];
            return jogoData === dataEsco;
        });
//chama a função mostrarJogos para exibir os jogos filtrados
        mostrarJogos(jogosFiltrados);
    })
//captura qualque erro que ocorra durante o fetch e exibe uma mensagem de erro no console e no elemento com id result caso ocorra um erro
    .catch(error => {
        console.error('Erro ao carregar os jogos:', error);
        document.getElementById('result').innerHTML = 'Erro ao carregar os jogos.';
    });

}

function mostrarJogos(jogosFiltrados) {
    const result = document.getElementById('result');
//limpa o conteúdo HTML do elemento result
    result.innerHTML = '';

    if (jogosFiltrados.length === 0) {
        result.innerHTML = 'Nenhuma partida para a data selecionada';
        return;
    }
//itera sobre cada jogo filtrado e cria um novo elemento <div> para cada jogo
    jogosFiltrados.forEach(jogo => {
        const div = document.createElement('div');
//define o conteúdo HTML do <div> com informações sobre o jogo, como ID, data e hora, equipes e placar.
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
//recebe os dados dos jogos, chama a função Dataas e exibe uma mensagem de erro no console caso ocorra um erro durante o fetch
fetch(url_jogos)
    .then(response => response.json())
    .then(jogos => {
        Dataas(jogos);
    })
    .catch(error => {
        console.error('Erro ao carregar dados para o select:', error);
    });