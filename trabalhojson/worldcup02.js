const url = `https://worldcupjson.net/matches`;



function Dataas(jogos) {
    const select = document.getElementById('data');
    const Datas = [...new Set(jogos.map(jogo => jogo.id))];

    Datas.forEach(data => {
        const option = new Option(data, data);
        select.add(option);
    });
    
}



async function processMatch(id) {
let match_info = await fetch(`https://worldcupjson.net/matches/${id}/`);
match_info = await match_info.json();
return match_info;
};

function percorrerDetalhes(value, key, text) {
if (typeof value == 'object') {
    let keys = Object.keys(value);
    text = `text + <br><b>${key.replace('_', ' ')}:</b><br><br>`;
    for (let chave of keys) {
        if (typeof value[chave] === 'object' && value[chave] !== null ) {
            text = percorrerDetalhes(value[chave], chave, text)
        }
        else {
           text = `text +   ${chave}: ${value[chave]}<br>`
        }
    }
    return text;
}
else {
    text = `text + ${key}: ${value}`;
    return text;
}

};

function main(){
    const data = document.getElementById("data").value;
    let detalhes = processMatch(data)
}


fetch(url)
    .then(response => response.json())
    .then(jogos => {
        Dataas(jogos);
    })
    .catch(error => {
        console.error('Erro ao carregar dados para o select:', error);
    });