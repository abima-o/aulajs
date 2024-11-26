export class Funcionario{
    private _nome: string;
    private _cargo: string;
    private _salario: number;

    constructor(nome: string, cargo: string, salario: number){
        this._nome = nome;
        this._cargo = cargo;
        this._salario = salario;
    }

    get nome(){
        return this._nome;
    }

    set nome(novoNome: string){
        if (novoNome.length > 0){
            this._nome = novoNome;
        } else{
            console.log("O nome não pode ser vazio.");
        }
    }

    get cargo(){
        return this._cargo;
    }

    set cargo(novoCargo: string){
        if (novoCargo.length > 0){
            this._cargo = novoCargo;
        } else{
            console.log("O cargo não pode ser vazio.");
        }
    }

    get salario(){
        return this._salario;
    }

    descrição(): string {
        return `Nome: ${this._nome} Cargo: ${this._cargo} Salário: R$${this._salario}`; 
     }

    aplicarAumento(percentual: number){
        if (percentual > 0){
            this.salario + percentual == this.salario;
        }
    }
}