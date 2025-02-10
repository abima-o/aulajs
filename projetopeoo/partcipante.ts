export class Participante {
    private _nome: string;
    private _email: string;
    private _evento: Evento;

    constructor(nome: string, email: string, evento: Evento){
        this._nome = nome;
        this._email = email;
        this._evento = evento;
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

    get email(){
        return this._email;
    }

    set email(email: string){
        if (email.includes('@')) {
          this._email = email;
        } else {
          console.log('Email inválido!');
    }}

    get evento(){
        return this._evento;
    }

    set evento(novoEvento: Evento){
        if (novoEvento){
            this._evento = novoEvento;
        } else {
            console.log("Evento inválido!")
        }
    }
}


function inscreverParticipante(event: Event) {
    event.preventDefault();
  
    const nomeParticipante = (document.getElementById('participante-nome') as HTMLInputElement).value;
    const emailParticipante = (document.getElementById('participante-email') as HTMLInputElement).value;
    const eventoEscolhido = eventoSelecionado.value;
  
    const eventoInscrito = eventos.find(evento => evento.nome === eventoEscolhido);
  
    if (eventoInscrito) {
        const participante = new Participante(nomeParticipante, emailParticipante, eventoInscrito);
        participantes.push(participante);
        atualizarParticipantes();
        } else {
        alert('Por favor, selecione um evento válido.');
        }
}

function atualizarParticipantes() {
    const tbody = participanteTabela.querySelector('tbody')!;
    tbody.innerHTML = '';
  
    participantes.forEach(participante => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${participante.nome}</td>
        <td>${participante.email}</td>
        <td>${participante.evento.nome}</td>
        <td><button onclick="gerarCertificado('${participante.nome}', '${participante.email}', '${participante.evento.nome}', '${participante.evento.organizador.nome}', '${participante.evento.data}', '${participante.evento.local.nome}')">Gerar Certificado</button></td>
      `;
      tbody.appendChild(tr);
    });
}