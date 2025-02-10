export class Evento {
    private _nome: string;
    private _data: Date;
    private _local: Local;
    private _organizador: Organizador;

    constructor(nome: string, data: Date, local: Local, organizador: Organizador){
        this._nome = nome;
        this._data = data;
        this._local = local;
        this._organizador = organizador;
    }

    get nome(){
        return this._nome;
    }

    set nome(novoNome: string){
        if (novoNome.length > 0){
            this._nome = novoNome;
        } else{
            console.log("O nome não pode ser vazio.");
        }
    }

    get data(){
        return this._data;
    }

    set data(novoData: Date){
        if(novoData instanceof Date && !isNaN(novoData.getTime())){
            this._data = novoData;
        } else {
            console.log("Data inválida!")
        }
    }

    get local(){
        return this._local;
    }

    set local(novoLocal: Local){
        if(novoLocal){
            this._local = novoLocal;
        } else {
            console.log("Local inválido!")
        }
    }

    get organizador(){
        return this._local;
    }

    set organizador(novoOrganizador: Organizador){
        if (novoOrganizador){
            this._organizador = novoOrganizador
        } else {
        console.log("Esse organizador não existe!")
        }
    }
}

function adicionarEvento(event: Event) {
    event.preventDefault();
  
    const nomeEvento = (document.getElementById('evento-nome') as HTMLInputElement).value;
    const organizadorNome = (document.getElementById('evento-organizador') as HTMLInputElement).value;
    const eventoDataString = (document.getElementById('evento-data') as HTMLInputElement).value;
    const eventoLocalNome = (document.getElementById('evento-local') as HTMLInputElement).value;
  
    const eventoData = new Date(eventoDataString);

    if (!nomeEvento || !organizadorNome || isNaN(eventoData.getTime()) || !eventoLocalNome){
        console.log("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const eventoLocal = new Local(eventoLocalNome);
    const organizador = new Organizador(organizadorNome);

    const novoEvento = new Evento(nomeEvento, eventoData, eventoLocal, organizador);
  
    eventos.push(novoEvento);
    atualizarEventos();
    atualizarEventosNoSelect();
}

function atualizarEventos() {
    const tbody = document.getElementById('eventos-tabela')!.querySelector('tbody')!
    tbody.innerHTML = '';
  
    eventos.forEach(evento => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${evento.nome}</td>
        <td>${evento.organizador.nome}</td>
        <td>${evento.data}</td>
        <td>${evento.local.nome}</td>
      `;
      tbody.appendChild(tr);
    });
}

function atualizarEventosNoSelect() {
    const eventoSelecionado = document.getElementById('evento-selecionado') as HTMLSelectElement;
    eventoSelecionado.innerHTML = '<option value="" disabled selected>Selecione um evento:</option>';
    
    eventos.forEach(evento => {
      const option = document.createElement('option');
      option.value = evento.nome;
      option.textContent = evento.nome;
      eventoSelecionado.appendChild(option);
    });
}