let pessoa = {
    nome: "Jonas",
    idade: 17,
    profissao: "Atleta",
    exibir: function() {
       return `Nome: ${this.nome}, Idade: ${this.idade}, Profissão: ${this.profissao}`
    }    

};

console.log(pessoa.exibir());

let jsonString = JSON.stringify(pessoa. null, 2);
console.log(jsonString);

jsonString = '{"nome": "Maria", "idade": 25, "profissao":"Analista"}';
pessoa = JSON.parse(jsonString);
console.log(pessoa);
