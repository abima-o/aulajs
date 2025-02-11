import { Evento } from './evento';

export class Participante {
    private _nome: string;
    private _email: string;
    private _evento: Evento;

    constructor(nome: string, email: string, evento: Evento) {
        this._nome = nome;
        this._email = email;
        this._evento = evento;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(novoNome: string) {
        if (novoNome.length > 0) {
            this._nome = novoNome;
        } else {
            console.log("O nome não pode ser vazio.");
        }
    }

    get email(): string {
        return this._email;
    }

    set email(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            this._email = email;
        } else {
            console.log('Email inválido!');
        }
    }

    get evento(): Evento {
        return this._evento;
    }

    set evento(novoEvento: Evento) {
        if (novoEvento) {
            this._evento = novoEvento;
        } else {
            console.log("Evento inválido!");
        }
    }
}

let eventoSelecionado: HTMLSelectElement;
let eventos: Evento[] = [];
let participantes: Participante[] = [];
let participanteTabela: HTMLTableElement;

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
    const tbody = participanteTabela.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = '';

        participantes.forEach(participante => {
            const tr = document.createElement('tr');

            const nomeTd = document.createElement('td');
            nomeTd.textContent = participante.nome;
            tr.appendChild(nomeTd);

            const emailTd = document.createElement('td');
            emailTd.textContent = participante.email;
            tr.appendChild(emailTd);

            const eventoTd = document.createElement('td');
            eventoTd.textContent = participante.evento.nome;
            tr.appendChild(eventoTd);

            const buttonTd = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = 'Gerar Certificado';
            button.onclick = () => gerarCertificado(participante.nome, participante.email, participante.evento.nome, participante.evento.organizador.nome, participante.evento.data, participante.evento.local.nome);
            buttonTd.appendChild(button);
            tr.appendChild(buttonTd);

            tbody.appendChild(tr);
        });
    }
}

function gerarCertificado(nome: string, email: string, eventoNome: string, organizadorNome: string, data: string, localNome: string) {
    // Implementação da função
}