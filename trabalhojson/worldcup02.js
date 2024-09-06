const url = 'https://worldcupjson.net/matches';

// Preenche o elemento select com IDs únicos dos jogos
    function preencherSelect(jogos) {
        const select = document.getElementById('data');
        const ids = [...new Set(jogos.map(jogo => jogo.id))]; // Use `id` para criar opções no select
        ids.forEach(id => {
            const option = new Option(id, id);
            select.add(option);
        });
    }

// Busca detalhes do jogo com base no ID selecionado
    async function buscarDetalhesDoJogo(id) {
        const response = await fetch(`https://worldcupjson.net/matches/${id}`);
        const jogo = await response.json();
        return jogo;
        }

// Gera HTML para exibir os detalhes do jogo
    function gerarHtmlDetalhes(obj) {
        let html = '';
        function recursivo(valor, chave) {
            if (typeof valor === 'object' && valor !== null) {
                html += `<b>${chave.replace('_', ' ')}:</b><br>`;
                Object.keys(valor).forEach(subChave => recursivo(valor[subChave], subChave));
            } else {
                html += `${chave}: ${valor}<br>`;
            }
        }
        recursivo(obj, 'Detalhes do Jogo');
        return html;
    }

// Lida com mudanças no elemento select e exibe os detalhes do jogo
    async function lidarComMudancaSelect() {
        const id = document.getElementById('data').value;
        const jogo = await buscarDetalhesDoJogo(id);
        const containerDetalhes = document.getElementById('details');

        containerDetalhes.innerHTML = gerarHtmlDetalhes(jogo);
    }

// Inicializa a página preenchendo o select e adicionando um listener de evento
    function inicializar() {
        fetch(url)
            .then(response => response.json())
            .then(jogos => preencherSelect(jogos))
            .catch(error => console.error('Erro ao carregar dados para o select:', error));

        document.getElementById('data').addEventListener('change', lidarComMudancaSelect);
    }

// Executa a inicialização
inicializar();