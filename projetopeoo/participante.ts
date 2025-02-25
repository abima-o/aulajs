import { Evento } from './evento';
import { Organizador } from './organizador';

export class Participante {
    private _nome: string;
    private _email: string;
    private _evento: Evento;

    constructor(nome: string, email: string, evento: Evento) {
        if (!evento) {
            throw new Error("Evento inválido!");
        }
        this.nome = nome;
        this.email = email;
        this._evento = evento;
    }

    get nome(){
        return this._nome;
    }

    set nome(novoNome: string) {
        if (novoNome.trim().length > 0) {
            this._nome = novoNome;
        } else {
            throw new Error("O nome não pode ser vazio.");
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
            throw new Error('Email inválido!');
        }
    }

    get evento(): Evento {
        return this._evento;
    }
}

const eventoSelecionado = document.getElementById('evento-selecionado') as HTMLSelectElement;
const participanteTabela = document.getElementById('participante-tabela') as HTMLTableElement;
const formInscricao = document.getElementById('form-inscricao');

if (!eventoSelecionado || !participanteTabela || !formInscricao) {
    throw new Error('Elementos HTML não encontrados!');
}

let eventos: Evento[] = [];
let participantes: Participante[] = [];

function inscreverParticipante(event: Event) {
    event.preventDefault();

    const nomeParticipante = (document.getElementById('participante-nome') as HTMLInputElement).value;
    const emailParticipante = (document.getElementById('participante-email') as HTMLInputElement).value;
    const eventoEscolhido = eventoSelecionado.value;

    const eventoInscrito = eventos.find(evento => evento.nome === eventoEscolhido);

    if (eventoInscrito) {
        const participante = new Participante(nomeParticipante, emailParticipante, eventoInscrito);
        participantes.push(participante);
        salvarParticipantes();
        atualizarParticipantes();
    } else {
        alert('Por favor, selecione um evento válido.');
    }
}

function atualizarParticipantes() {
    console.log('Atualizando participantes');
    let tbody = participanteTabela.querySelector('tbody');
    if (!tbody) {
        console.log('Criando novo tbody');
        tbody = document.createElement('tbody');
        participanteTabela.appendChild(tbody);
    }
    console.log('Limpando tbody');
    tbody.innerHTML = '';
    participantes.forEach(function(participante) {
        const tr = document.createElement('tr');
        const button = document.createElement('button');
        button.textContent = "Gerar Certificado"

        button.addEventListener('click', () => {
            gerarCertificado(
                participante.nome, 
                participante.email, 
                participante.evento.nome, 
                participante.evento.organizador.nome, 
                participante.evento.data.toLocaleDateString(), 
                participante.evento.local
            );
        });

        tr.innerHTML = `
            <td>${participante.nome}</td>
            <td>${participante.email}</td>
            <td>${participante.evento.nome}</td>`;

        const tdButton = document.createElement('td')
        tdButton.appendChild(button);
        tr.appendChild(tdButton);
        tbody.appendChild(tr);
    });
}

function gerarCertificado(nome: string, email: string, eventoNome: string, organizadorNome: string, data: string, localNome: string) {
    const conteudo = `
        Certificado de Participação\n
        Nome: ${nome}\n
        Email: ${email}\n
        Evento: ${eventoNome}\n
        Organizador: ${organizadorNome}\n
        Data: ${data}\n
        Local: ${localNome}\n
    `;
    
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Certificado_${nome}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function salvarParticipantes() {
    localStorage.setItem('participantes', JSON.stringify(participantes));
}

function carregarParticipantes() {
    const dados = localStorage.getItem('participantes');
    if (dados) {
        participantes = JSON.parse(dados);
        atualizarParticipantes();
    }
}

formInscricao.addEventListener('submit', inscreverParticipante);

const organizador1 = new Organizador('Organizador 1');
const organizador2 = new Organizador('Organizador 2');


const evento1 = new Evento('Evento 1', new Date('2023-10-01'), 'Local 1', organizador1);
const evento2 = new Evento('Evento 2', new Date('2023-11-01'), 'Local 2', organizador2);

eventos.push(evento1, evento2);

function carregarEventos() {
    eventos.forEach(evento => {
        const option = document.createElement('option');
        option.value = evento.nome;
        option.textContent = evento.nome;
        eventoSelecionado.appendChild(option);
    });
}

carregarEventos();
carregarParticipantes();
