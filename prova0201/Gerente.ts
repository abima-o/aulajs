export class Gerente{
    private _nome: string;
    private _bonus: number;
    private _salario: number;

    constructor(nome: string, bonus: number, salario: number){
        this._nome = nome;
        this._bonus = bonus;
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

    get bonus(){
        return this._bonus;
    }

    set bonus(novoBonus: number){
        if (novoBonus > 0){
            this._bonus = novoBonus;
        } else{
            console.log("O bônus não pode ser negativo.");
        }
    }

    get salario(){
        return this._salario;
    }

    descrição(): string {
        return `Nome: ${this._nome} Cargo: Gerente  Bônus: R$${this._bonus}  Salário: ${this._bonus + this._salario}`; 
     }

    aplicarAumento(percentual: number){
        if (percentual > 0){
            this.salario + percentual == this.salario;
        }
    }
}