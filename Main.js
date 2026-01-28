const prompt = require('prompt-sync')();
const Sistema = require('./Sistema');

const sistema = new Sistema();

// **DADOS PARA TESTE**
 
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
                
                //Saindo do sistema 
                if (opcaoAgente === "0") {
                    sistema.logout();
                }

                // Gerenciando Condutores
                else if (opcaoAgente === "1") {
                    // Lista os condutores automaticamente
                    console.log(sistema.listarCondutores());


                    //Prosseguirá se um ID válido for inserido
                    const idCondutor = prompt("Digite o ID do condutor para gerenciar (ou enter para voltar): ");
                    const condutorAlvo = sistema.buscarCondutor(idCondutor);
                    if (condutorAlvo) {
                        //Ações serão implementadas aqui



                    }
                    else if (idCondutor) {
                        console.log("Condutor não encontrado.");
                    }
                //Saindo do sistema
                else if (opcaoAgente === "0") {
                    sistema.logout();
                }


                }

     
            }
            //Se está logado e não é agente, é condutor
            else{
                console.log("**Você está logado como: CONDUTOR**");
                console.log("0. Sair");
                console.log("1. Ver meus dados");
                console.log("2. Cadastrar veículos");

                const opcaoCondutor = prompt("Escolha uma opção: ");

                //Saindo do sistema 
                if (opcaoCondutor === "0") {
                    sistema.logout();
                }

                else if (opcaoCondutor === "1") {
                    console.log("\n** MEUS DADOS **");
                    console.log(`Nome: ${sistema.usuariologado.nome}`);
                    console.log(`CPF: ${sistema.usuariologado.cpf}`);
                    console.log(`Data de Nascimento: ${sistema.usuariologado.nascimento}`);
                    console.log(`Email: ${sistema.usuariologado.email}`);
                }

                else if (opcaoCondutor === "2") {
                    //a ser preenchido

                }

                else{
                    console.log("Opção inválida!");
                }
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
    prompt("Pressione ENTER para voltar ao menu...");
}

// Inicia o programa
main();