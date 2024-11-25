var Livro = /** @class */ (function () {
    function Livro(titulo, autor, preco) {
        this._titulo = titulo;
        this._autor = autor;
        this._preco = preco;
    }
    

    Livro.prototype.descrição = function () {
        return "T\u00EDtulo: " + this._titulo +  " Autor: " + this._autor + " Pre\u00E7o: R$" + this._preco;
    };
    return Livro;
}());
var livro1 = new Livro("O Príncipe Cruel", "Holly Black", 29);
console.log(livro1.descrição());
