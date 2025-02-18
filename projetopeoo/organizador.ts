export class Organizador{
    private _nome: string;

    constructor(nome: string){
        this._nome = nome
    }

    get nome(){
        return this._nome;
    }

    set nome(novoNome: string){
        if(novoNome.length > 0){
            this._nome = novoNome;
        } else{
            console.log("O nome não pode ser vazio.")
        }
    }
}