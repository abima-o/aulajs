const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`

function preencherSelect(pokemons) {
    const select = document.getElementById("data");
    const names = [...new Set(pokemons.map(poke => poke.name))];
    names.forEach(name => {
        const option = new Option(name, name);
        select.add(option);
    })
}

async function detalhes(name) {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const data = await response.json();
    } catch (error) {
        console.error("Erro ao buscar os detalhes")
    }
}