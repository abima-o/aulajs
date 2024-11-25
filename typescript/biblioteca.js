var Livro = /** @class */ (function () {
    function Livro(titulo, autor, preco) {
        this._titulo = titulo;
        this._autor = autor;
        this._preco = preco;
    }
    Object.defineProperty(Livro.prototype, "preco", {
        get: function () {
            return this._preco;
        },
        set: function (novoPreco) {
            if (novoPreco >= 0)
                this._preco = novoPreco;
            else
                console.log("Não permitido valores negativos ou nulos.");
        },
        enumerable: true,
        configurable: true
    });
    Livro.prototype.descrição = function () {
        return "T\u00EDtulo: " + this._titulo + " Autor: " + this._autor + " Pre\u00E7o: R$" + this._preco;
    };
    return Livro;
}());
var Biblioteca = /** @class */ (function () {
    function Biblioteca() {
        this._livros = [];
    }
    Biblioteca.prototype.adicionarLivros = function (livro) {
        this.livros.push(livro);
        console.log("Livro adicionado com sucesso");
    };
    Biblioteca.prototype.listarLivros = function () {
        console.log("LISTAGEM DOS LIVROS:");
        this.livros.forEach(function (livro) {
            console.log("- " + livro.descrição());
        });
    };
    return Biblioteca;
}());
var livro1 = new Livro("1984", "George Orwell", 16.09);
var livro2 = new Livro("O Senhor dos Anéis (box)", "Tolkien", 129.90);
var livro3 = new Livro("Admirável mundo novo", "Huxley", 34.70);
var biblio = new Biblioteca();
biblio.adicionarLivro(livro1);
biblio.adicionarLivro(livro2);
biblio.adicionarLivro(livro3);
biblio.listarLivros();
biblio.adicionarLivro(new Livro("O Pequeno Príncipe", "Saint-Exupery", 30));
biblio.listarLivros();
