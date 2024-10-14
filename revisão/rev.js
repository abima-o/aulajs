const url = `http://worldtimeapi.org/api/timezone`

function select(timezones){
    const select = document.getElementById("data")
    const uniTime = [...new Set(timezones.map(fuso => fuso.timezone))];

    uniTime.sort((a, b) => a.localeCompare(b));

    uniTime.forEach(tz => {
        const option = new Option(tz, tz);
        select.add(option);
    });
}

async function detalhes(timezone) {
    try {
        const response = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
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


    Object.keys(obj).forEach(key => recursivo(obj[key], key));
    
    return html;
}

async function mudançaSelect() {
    const timezone = document.getElementById("data").value;
    const fuso = await detalhes(timezone);
    const containerDetalhes = document.getElementById("fusohorario");

    containerDetalhes.innerHTML = gerarHtmlDetalhes(fuso);
}


function inicializar() {
    fetch(url)
        .then(response => response.json())
        .then(timezones => {
            console.log("Timezones recebidos:", timezones);
            select(timezones);
        })
        .catch(error => console.error('Erro ao carregar dados para o select:', error));

    document.getElementById('data').addEventListener('change', mudançaSelect);
}


inicializar();