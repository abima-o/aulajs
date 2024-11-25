class Livro { 
    
    private _titulo: string; 
    private _autor: string;
    private _preco: number;

    constructor(titulo: string, autor: string, preco: number){
        this._titulo = titulo;
        this._autor = autor;
        this._preco = preco;
    }

    get preco(){
        return this._preco;
    }

    set preco(novoPreco: number){
        if (novoPreco >= 0)
            this._preco = novo_preco;
        else
            console.log("Não permitido valores negativos ou nulos.")
    }


    descrição(): string {
       return `Título: ${this._titulo} Autor: ${this._autor} Preço: R$${this._preco}`; 
    }
}

const livro1 =  new Livro("O Príncipe Cruel", "Holly Black", 29);
console.log(livro1.descrição());