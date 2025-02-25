"use strict";
exports.__esModule = true;
var evento_1 = require("./evento");
var organizador_1 = require("./organizador");
var Participante = /** @class */ (function () {
    function Participante(nome, email, evento) {
        if (!evento) {
            throw new Error("Evento inválido!");
        }
        this.nome = nome;
        this.email = email;
        this._evento = evento;
    }
    Object.defineProperty(Participante.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        set: function (novoNome) {
            if (novoNome.trim().length > 0) {
                this._nome = novoNome;
            }
            else {
                throw new Error("O nome não pode ser vazio.");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Participante.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (email) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(email)) {
                this._email = email;
            }
            else {
                throw new Error('Email inválido!');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Participante.prototype, "evento", {
        get: function () {
            return this._evento;
        },
        enumerable: true,
        configurable: true
    });
    return Participante;
}());
exports.Participante = Participante;
var eventoSelecionado = document.getElementById('evento-selecionado');
var participanteTabela = document.getElementById('participante-tabela');
var formInscricao = document.getElementById('form-inscricao');
if (!eventoSelecionado || !participanteTabela || !formInscricao) {
    throw new Error('Elementos HTML não encontrados!');
}
var eventos = [];
var participantes = [];
function inscreverParticipante(event) {
    event.preventDefault();
    var nomeParticipante = document.getElementById('participante-nome').value;
    var emailParticipante = document.getElementById('participante-email').value;
    var eventoEscolhido = eventoSelecionado.value;
    var eventoInscrito = eventos.find(function (evento) { return evento.nome === eventoEscolhido; });
    if (eventoInscrito) {
        var participante = new Participante(nomeParticipante, emailParticipante, eventoInscrito);
        participantes.push(participante);
        salvarParticipantes();
        atualizarParticipantes();
    }
    else {
        alert('Por favor, selecione um evento válido.');
    }
}
function atualizarParticipantes() {
    var tbody = participanteTabela.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        participanteTabela.appendChild(tbody);
    }
    tbody.innerHTML = '';
    participantes.forEach(function (participante) {
        var tr = document.createElement('tr');
        var button = document.createElement('button');
        button.textContent = "Gerar Certificado";
        button.addEventListener('click', function () {
            gerarCertificado(participante.nome, participante.email, participante.evento.nome, participante.evento.organizador.nome, participante.evento.data.toLocaleDateString(), participante.evento.local);
        });
        tr.innerHTML = "\n            <td>" + participante.nome + "</td>\n            <td>" + participante.email + "</td>\n            <td>" + participante.evento.nome + "</td>";
        var tdButton = document.createElement('td');
        tdButton.appendChild(button);
        tr.appendChild(tdButton);
        tbody.appendChild(tr);
    });
}
function gerarCertificado(nome, email, eventoNome, organizadorNome, data, localNome) {
    var conteudo = "\n        Certificado de Participa\u00E7\u00E3o\n\n        Nome: " + nome + "\n\n        Email: " + email + "\n\n        Evento: " + eventoNome + "\n\n        Organizador: " + organizadorNome + "\n\n        Data: " + data + "\n\n        Local: " + localNome + "\n\n    ";
    var blob = new Blob([conteudo], { type: 'text/plain' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "Certificado_" + nome + ".txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function salvarParticipantes() {
    localStorage.setItem('participantes', JSON.stringify(participantes));
}
function carregarParticipantes() {
    var dados = localStorage.getItem('participantes');
    if (dados) {
        participantes = JSON.parse(dados);
        atualizarParticipantes();
    }
}
formInscricao.addEventListener('submit', inscreverParticipante);
var organizador1 = new organizador_1.Organizador('Organizador 1');
var organizador2 = new organizador_1.Organizador('Organizador 2');
var evento1 = new evento_1.Evento('Evento 1', new Date('2023-10-01'), 'Local 1', organizador1);
var evento2 = new evento_1.Evento('Evento 2', new Date('2023-11-01'), 'Local 2', organizador2);
eventos.push(evento1, evento2);
function carregarEventos() {
    eventos.forEach(function (evento) {
        var option = document.createElement('option');
        option.value = evento.nome;
        option.textContent = evento.nome;
        eventoSelecionado.appendChild(option);
    });
}
carregarEventos();
carregarParticipantes();
