const url_teams = 'https://worldcupjson.net/teams';

    fetch(url_teams) 
        .then(response => response.json())
        .then(groups => gerarTabela(groups))
        .catch(error => displayError(error))

        function gerarTabela(object) {
            const container = document.createElement('div'); // div pra cada tabela
        
            // criou a variavel group para cada objeto
            for (let group of object.groups) {

                // Cria uma tabela para o grupo
                const table = document.createElement('table');
                table.style.width = '100%';
                table.style.borderCollapse = 'collapse';
    
//inicio do cabecalho
                //criou uma thead (para os cabecalhos) e uma tr (linha) para cada grupo
                const thead = document.createElement('thead');
                const headingRow = document.createElement('tr');
        
                // define os cabeçalhos
                const headers = [
                    'País', 'Pontos', 'Nome', 'Grupo', 'Vitórias', 'Empates', 
                    'Derrotas', 'Jogos', 'Gols pró', 'Gols contra', 'Diferencial'
                ];
        
                // Usou a array criada acima para colocar condições especificas. primeiro, criou uma th e colcoou que a coisa escrita na th seja igual ao header. depois juntou o th a linha de cabecalho
                headers.forEach(header => {
                    const th = document.createElement('th');
                    th.innerText = header;
                    headingRow.appendChild(th);
                });
                // adicionou a linha de cabeçalhos ao thead e depois adicionou a tabela
                thead.appendChild(headingRow);
                table.appendChild(thead);
//fim do cabeçalho

                // criou o corpo da tabela
                const tbody = document.createElement('tbody');
        
                // criou a variavel team para cada objeto de teams que está em group - criou a linha que será adicionado os objetos (informacoes)
                for (let team of group.teams) {
                    const row = document.createElement('tr');
                    
                    // cria uma variavel usando cada objeto como valor - o || é usado para substituir as linhas sem valores por 0
                    const cellValues = [
                        team.country || '0', // País
                        team.group_points || '0', // Pontos
                        team.name || '0', // Nome
                        team.group_letter || '0', // Grupo
                        team.wins || '0', // Vitórias
                        team.draws || '0', // Empates
                        team.losses || '0', // Derrotas
                        team.games_played || '0', // Jogos
                        team.goals_for || '0', // Gols pró
                        team.goals_against || '0', // Gols contra
                        team.goal_differential || '0' // Diferencial
                    ];
                    
                    // verifiac os valores nas celulas e adiciona em uma td para cada valor
                    cellValues.forEach(value => {
                        const cell = document.createElement('td');
                        // Define o texto dentro do elemento <td> como o valor atual do array cellValues.
                        cell.innerText = value;
                        // adiciona cell na linha tr
                        row.appendChild(cell);
                    });
                    // junta a linha tr ao tbody
                    tbody.appendChild(row);
                }
                // junta o tbody a table - adiciona a tabela a cada conteiner (div) - cria um espaço entre as tabelas
                table.appendChild(tbody);
                container.appendChild(table);
                container.appendChild(document.createElement('br')); 
            }
        
            document.body.appendChild(container); // Adiciona o conte0iner (div) ao corpo do documento
        }
        
        function displayError(error) {
            const errorParagraph = document.getElementById('resultado');
            errorParagraph.innerHTML = `Ocorreu um erro no carregamento: ${error.message}`;
        }
        
        carregarTabela();