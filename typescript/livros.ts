class Livro { 
    
    private _titulo: string; 
    private _autor: string;
    private _preco: number;

    constructor(titulo: string, autor: string, preco: number){
        this._titulo = titulo;
        this._autor = autor;
        this._preco = preco;
    }

    public get titulo(): string{
        return this._titulo;
    }
    
    public set titulo(novoTitulo: string){
        if (novoTitulo.length > 0) {
            this._titulo = novoTitulo;
          } else {
            console.log("O título não pode ser vazio.");
          }
    }
    
    public get autor(): string {
        return this._autor;
    }
    
    public set autor(novoAutor: string) {
        if (novoAutor.length > 0) {
          this._autor = novoAutor;
        } else {
          console.log("O autor não pode ser vazio.");
        }
      }

    public get preco(): number {
        return this._preco;
    }

    public set preco(novoPreco: number){
        if (novoPreco > 0){
            this._preco = novoPreco;
        } else {
            console.log("O preço não pode ser negativo")
        }
    }

    descrição(): string {
       return `Título: ${this._titulo}<br> Autor: ${this._autor}<br> Preço: R$${this._preco}`; 
    }
}

const livro1 =  new Livro("O Príncipe Cruel", "Holly Black", 29);
console.log(livro1.descrição());