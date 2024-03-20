function idade(){
     let ddn = new Date(document.getElementById("ddn").value);
     /* new Date() é uma função que contém a date e hora atuais*/
     let da = new Date();
     let dif = da - ddn;
     let idade = Math.floor(dif/ (1000 * 60 * 60 * 24 * 365.25));
     /*Aqui, dividimos a diferença em milissegundos pelo número
     de milissegundos em um ano (365.25 dias) para obter a idade
     aproximada em anos. Usamos Math.floor() para arredondar o 
     resultado para baixo, pois queremos apenas a parte inteira
     da idade.*/
     return idade;
}
