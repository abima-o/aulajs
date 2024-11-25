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
            this._preco = novoPreco;
        else
            console.log("Não permitido valores negativos ou nulos.")
    }


    descrição(): string {
       return `Título: ${this._titulo} Autor: ${this._autor} Preço: R$${this._preco}`; 
    }
}
class Biblioteca{
    private _livros: Livro[] = [];

    adicionarLivros(livro: Livro) : void{
        this._livros.push(livro);
        console.log("Livro adicionado com sucesso")
    }

    listarLivros() : void{
        console.log("LISTAGEM DOS LIVROS:");
        this._livros.forEach(livro => {
            console.log("- " + livro.descrição());
        });

    }
}

let livro1 = new Livro("1984", "George Orwell", 16.09);
let livro2 = new Livro("O Senhor dos Anéis (box)", "Tolkien", 129.90);
let livro3 = new Livro("Admirável mundo novo", "Huxley", 34.70);

let biblio = new Biblioteca();
biblio.adicionarLivros(livro1);
biblio.adicionarLivros(livro2);
biblio.adicionarLivros(livro3);
biblio.listarLivros();
biblio.adicionarLivros(new Livro("O Pequeno Príncipe", "Saint-Exupery", 30));
biblio.listarLivros();