import { Funcionario } from "./Funcionario";

export class Empresa{
    private _nome: string;
    private _funcionarios: Funcionario[] = [];

    constructor(nome: string){
        this._nome = nome;
    }

    get nome(){
        return this._nome;
    }

    set nome(novoNome: string){
        if(novoNome.length > 0){
            this._nome = novoNome;
        } else {
            console.log("O nome não pode ser vazio.")
        }
    }

    adicionarFuncionario(funcionarios: Funcionario ):void{
        this._funcionarios.push(funcionarios);
        console.log("Funcionário contratado com sucesso!")
    }

    listarFuncionarios() : void{
        console.log("LISTAGEM DOS FUNCIONÁRIOS:");
        this._funcionarios.forEach(funcionarios => {
            console.log("- " + funcionarios.descrição());
        });

    }
}