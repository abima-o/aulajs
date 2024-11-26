import { Empresa } from './Empresa'
import { Funcionario } from './Funcionario'
import { Gerente } from './Gerente'


const funcionario1 = new Funcionario("Abimael", "Secretário", 1000);
const funcionario2 = new Funcionario("Sara", "Secretária", 1000);
const funcionario3 = new Funcionario("Rafael", "Secretário", 1000);
const gerente1 = new Gerente("Givanaldo", 500, 5000);
const gerente2 = new Gerente("Paulo Vitor", 500, 6000);



const funcionarios = new Empresa("Tech Soluções");
funcionarios.adicionarFuncionario(funcionario1);
funcionarios.adicionarFuncionario(funcionario2);
funcionarios.adicionarFuncionario(funcionario3);
funcionarios.adicionarFuncionario(gerente1);
funcionarios.adicionarFuncionario(gerente2);

funcionarios.listarFuncionarios()

funcionario1.aplicarAumento(10/100);
funcionario2.aplicarAumento(15/100);
gerente1.aplicarAumento(10/100);
gerente2.aplicarAumento(50);

funcionario1.listarFuncionarios();