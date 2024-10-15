const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
const select = document.getElementById("pokemons");
const resultado = document.getElementById("resultado");
let pok = []
fetch(url)
.then(response => response.json())
.then(pokemons => {
    for(let pokemon of Object.keys(pokemons.results)) {
        pok.push(pokemons ['results'][pokemon]['name'])
    };
    pok.sort();
    pok.forEach((pokemon) => {
        const option = document.createElement("option");
        option.value = pokemon
        option.textContent = pokemon
        select.appendChild(option);
    })
});

function exibirInformacoes() {
    const poke = document.getElementById("pokemons").value;
    const urlpoke = `https://pokeapi.co/api/v2/pokemon/${poke}`;

    fetch(urlpoke)
    .then(response => response.json())
    .then(data => {
        // Limpa o conteúdo anterior
        resultado.innerHTML = '';

        // Cria um elemento para exibir as informações
        const info = `
            <h2>${data.name.toUpperCase()}</h2>
            <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Altura:</strong> ${data.height / 10} m</p>
            <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
            <p><strong>Habilidades:</strong> ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
        `;
        resultado.innerHTML = info;
    })
    .catch(error => {
        console.error('Erro ao buscar informações do Pokémon:', error);
        resultado.innerHTML = '<p>Erro ao carregar as informações.</p>';
    });
}

// Adiciona um evento para chamar a função ao selecionar um Pokémon
select.addEventListener('change', exibirInformacoes);