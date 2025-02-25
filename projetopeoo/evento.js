"use strict";
exports.__esModule = true;
var organizador_1 = require("./organizador");
var Evento = /** @class */ (function () {
    function Evento(nome, data, local, organizador) {
        this._nome = nome;
        this._data = data;
        this._local = local;
        this._organizador = organizador;
    }
    Object.defineProperty(Evento.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        set: function (novoNome) {
            if (novoNome.length > 0) {
                this._nome = novoNome;
            }
            else {
                console.log("O nome não pode ser vazio.");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Evento.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (novoData) {
            if (novoData instanceof Date && !isNaN(novoData.getTime())) {
                this._data = novoData;
            }
            else {
                console.log("Data inválida!");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Evento.prototype, "local", {
        get: function () {
            return this._local;
        },
        set: function (novoLocal) {
            if (novoLocal) {
                this._local = novoLocal;
            }
            else {
                console.log("Local inválido!");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Evento.prototype, "organizador", {
        get: function () {
            return this._organizador;
        },
        set: function (novoOrganizador) {
            if (novoOrganizador) {
                this._organizador = novoOrganizador;
            }
            else {
                console.log("Esse organizador não existe!");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Evento;
}());
exports.Evento = Evento;
var eventos = [];
function adicionarEvento(event) {
    event.preventDefault();
    var nomeEvento = document.getElementById('evento-nome').value;
    var organizadorNome = document.getElementById('evento-organizador').value;
    var eventoDataString = document.getElementById('evento-data').value;
    var eventoLocalNome = document.getElementById('evento-local').value;
    var eventoData = new Date(eventoDataString);
    if (!nomeEvento || !organizadorNome || isNaN(eventoData.getTime()) || !eventoLocalNome) {
        console.log("Por favor, preencha todos os campos corretamente.");
        return;
    }
    var organizador = new organizador_1.Organizador(organizadorNome);
    var novoEvento = new Evento(nomeEvento, eventoData, eventoLocalNome, organizador);
    eventos.push(novoEvento);
    atualizarEventos();
    atualizarEventosNoSelect();
}
function atualizarEventos() {
    var tbody = document.getElementById('eventos-tabela').querySelector('tbody');
    tbody.innerHTML = '';
    eventos.forEach(function (evento) {
        var tr = document.createElement('tr');
        tr.innerHTML = "\n        <td>" + evento.nome + "</td>\n        <td>" + evento.organizador.nome + "</td>\n        <td>" + evento.data + "</td>\n        <td>" + evento.local + "</td>\n      ";
        tbody.appendChild(tr);
    });
}
function atualizarEventosNoSelect() {
    var eventoSelecionado = document.getElementById('evento-selecionado');
    eventoSelecionado.innerHTML = '<option value="" disabled selected>Selecione um evento:</option>';
    eventos.forEach(function (evento) {
        var option = document.createElement('option');
        option.value = evento.nome;
        option.textContent = evento.nome;
        eventoSelecionado.appendChild(option);
    });
}
