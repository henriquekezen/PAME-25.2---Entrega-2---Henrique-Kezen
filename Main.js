const prompt = require('prompt-sync')();
const Sistema = require('./Sistema');

const sistema = new Sistema();

// **DADOS PARA TESTE**
//(((Agente "hardcoded" para evitar que qualquer um possa cadastrar um novo Agente)))
 
sistema.cadastroAgente("Agente Henrique", "111.222.333-44", "1", "a", "HK-001");
sistema.cadastroCondutor("Condutor Henrique", "666.777.888-99", "nasc", "2", "b");


// **FUNÇÃO PRINCIPAL**
function main() {
    let executando = true;

    while (executando) {
        // Se não houver logado, mostra o menu inicial
        if (sistema.usuariologado === null) {
            console.log("\n=== SEGUE O FLUXO - INÍCIO ===");
            console.log("1. ENTRAR");
            console.log("2. Novo por aqui? CADASTRE-SE");
            
            
            const opcao = prompt("Escolha uma opção: ");

            switch (opcao) {
                case "1":
                    realizarLogin();
                    break;
                case "2":
                    realizarCadastro();
                    break;
                default:
                    console.log("Opção inválida!");
            }
        } 
        else if (sistema.usuariologado !== null) {
            // Se o usuário estiver logado, mostra o seu menu
            // Por enquanto, mostra apenas quem é e dá a opção de sair
            console.log(`\n=== BEM-VINDO, ${sistema.usuariologado.nome} ===`);

            //verifica se é agente por meio da existência de matrícula
            if (sistema.usuariologado.matricula) {
                console.log("**Você está logado como: AGENTE**");
                console.log("0. Sair");
                console.log("1. Gerenciar Condutores");
                

                const opcaoAgente = prompt("Escolha uma opção: ");
                

                switch (opcaoAgente) {
                    case "0":
                        sistema.logout()
                        break;
                    case "1":
                        prossegueAgente();
                        break;
                    default:
                        console.log("Opção inválida!");

                }
                    //Prosseguirá se um ID válido for inserido *** PASSAR PRO PROSSEGUE AGENTE
                    const idCondutor = prompt("Digite o ID do condutor para gerenciar (ou ENTER para voltar): ");
                    const condutorAlvo = sistema.buscarCondutor(idCondutor);
                    if (condutorAlvo) {
                        //Ações serão implementadas aqui



                    }
                    else if (idCondutor) {
                        console.log("Condutor não encontrado.");
                    }


                }

     
            }
            //Se está logado e não é agente, é condutor
            else{
                console.log("**Você está logado como: CONDUTOR**");
                console.log("0. Sair");
                console.log("1. Ver meus dados");
                console.log("2. Cadastrar veículos");
                console.log("3. Ver meus veículos");

                const opcaoCondutor = prompt("Escolha uma opção: ");
                    
                    //Sistema do Condutor
                    switch (opcaoCondutor) {
                        case "0":
                            sistema.logout()
                            break;
                        case "1":
                            verDados();
                            break;
                        case "2":
                            cadastroveiculos()
                            break;
                        case "3":
                            verveiculos()
                            break;
                        default:
                            console.log("Opção inválida!");
                    }
            }   
        }
}
    





//**FUNÇÕES SECUNDÁRIAS**

function realizarLogin() {
    console.log("\n** LOGIN **");
    const email = prompt("Email: ");
    const senha = prompt("Senha: "); 
    
    const tipo = sistema.login(email, senha);
    
    if (tipo) {
        console.log(`Login realizado com sucesso! Bem-vindo, ${tipo}.`);
    } 
    else {
        console.log("ERRO: Email ou senha incorretos.");
    }
}

function realizarCadastro() {
    console.log("\n** CADASTRO DE CONDUTOR **");
    const nome = prompt("Nome completo: ");
    const cpf = prompt("CPF: ");
    const nascimento = prompt("Data de Nascimento (DD-MM-AAAA): ");
    const email = prompt("Email: ");
    const senha = prompt("Crie uma senha: ");

    sistema.cadastroCondutor(nome, cpf, nascimento, email, senha);
    // O método cadastroCondutor já mostra o sucesso no console
    prompt("Pressione ENTER para voltar ...");
}

function prossegueAgente() {
    
        // Lista os condutores automaticamente
        console.log(sistema.listarCondutores());


        //Prosseguirá se um ID válido for inserido
        const idCondutor = prompt("Digite o ID do condutor para gerenciar (ou ENTER para voltar): ");
        const condutorAlvo = sistema.buscarCondutor(idCondutor);
        if (condutorAlvo) {
        //Ações serão implementadas aqui
        }
        else if (idCondutor) {
            console.log("Condutor não encontrado.");
        }
    
}

function verDados() {
    console.log("\n** MEUS DADOS **");
    console.log(`Nome: ${sistema.usuariologado.nome}`);
    console.log(`CPF: ${sistema.usuariologado.cpf}`);
    console.log(`Data de Nascimento: ${sistema.usuariologado.nascimento}`);
    console.log(`Email: ${sistema.usuariologado.email}`);
}

function cadastroveiculos(){
    console.log("\n** CADASTRO DE VEÍCULO **");
    const marca = prompt("Marca: ");
    const modelo = prompt("Modelo: ");
    const cor = prompt("Cor: ");
    const placa = prompt("Placa: ");

    sistema.cadastroVeiculo(placa, modelo, marca, cor);

    prompt("Pressione ENTER para voltar...");
}

function verveiculos(){
    console.log("\n** MEUS VEÍCULOS **");
    if (sistema.usuariologado.veiculos.length === 0) {
    console.log("Nenhum veículo cadastrado.");
    }
    else {
    console.log(`${sistema.listarVeiculos()}`);
    }
    
}


// Inicia o programa
main();