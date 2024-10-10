const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;

function preencherSelect(pokemons) {
    const select = document.getElementById("data");
    // Acessa a chave 'results' que contém os dados dos pokemons
    const names = [...new Set(pokemons.results.map(poke => poke.name))];

    names.sort((a, b) => a.localeCompare(b));
    
    names.forEach(name => {
        const option = new Option(name, name);
        select.add(option);
    });
}

async function detalhes(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar os detalhes", error);
    }
}

function gerarHtmlDetalhes(obj) {
    let html = '';

    function recursivo(valor, chave) {
        if (typeof valor === 'object' && valor !== null) {
            html += `<b>${chave.replace('_', ' ')}: </b><br>`;
            Object.keys(valor).forEach(subChave => recursivo(valor[subChave], subChave));
        } else {
            html += `${chave}: ${valor}<br>`;
        }
    }

    // Não precisamos passar o texto "Qual é esse pokemon?" para o recursivo
    Object.keys(obj).forEach(key => recursivo(obj[key], key));
    
    return html;
}

async function mudançaSelect() {
    const name = document.getElementById("data").value;
    const poke = await detalhes(name);
    const containerDetalhes = document.getElementById("information");

    containerDetalhes.innerHTML = gerarHtmlDetalhes(poke);
}

function inicializar() {
    fetch(url)
        .then(response => response.json())
        .then(pokemons => preencherSelect(pokemons))
        .catch(error => console.error('Erro ao carregar dados para o select:', error));

    document.getElementById('data').addEventListener('change', mudançaSelect);
}

// Executa a inicialização
inicializar();