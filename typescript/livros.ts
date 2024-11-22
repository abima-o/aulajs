class Livro {
    titulo: string; 
    autor: string;
    preco: string;

    constructor(titulo: string, autor: string, preco: string){
        this.titulo = titulo;
        this.autor = autor;
        this.preco = preco;
    }
    descrição(): string {
       return `Título: ${this.titulo}<br> Autor: ${this.autor}<br> Preço: ${this.preco}`; 
    }
}