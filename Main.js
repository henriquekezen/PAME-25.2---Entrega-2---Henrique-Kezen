const prompt = require('prompt-sync')();
const Sistema = require('./Sistema');

const sistema = new Sistema();

// **DADOS PARA TESTE**
//Agente  
sistema.cadastroAgente("Agente Henrique", "111.222.333-44", "admin@detran.com", "FFC1902", "HK-001");


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
        else {
            // Se o usuário estiver logado, mostra o seu menu
            // Por enquanto, mostra apenas quem é e dá a opção de sair
            console.log(`\n=== BEM-VINDO, ${sistema.usuariologado.nome} ===`);
            console.log("1. Ver Meus Dados");
            console.log("0.Sair ");

            const opcaoLogado = prompt("Escolha uma opção: "); 

            if (opcaoLogado === "0") {
                sistema.logout(); // Isso faz usuario virar null, voltando pro menu principal
            } else if (opcaoLogado === "1") {
                console.log(sistema.usuariologado);
            } else {
                console.log("Opção inválida.");
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
    } else {
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