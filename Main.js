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
            
            console.log(`\n=== BEM-VINDO, ${sistema.usuariologado.nome} ===`);

            //verifica se é agente por meio da existência de matrícula
            if (sistema.usuariologado.matricula) {
                console.log("**Você está logado como: AGENTE**");
                console.log("0. Sair");
                console.log("1. Gerenciar Condutores");
                console.log("2. Relatório Geral de Multas");
                console.log("3. Ver Meus Dados");
                console.log("4. Ver Todos os Veículos Cadastrados");
                console.log("5. Buscar Veículo por Placa");
                

                const opcaoAgente = prompt("Escolha uma opção: ");
                

                switch (opcaoAgente) {
                    case "0":
                        sistema.logout()
                        break;
                    case "1":
                        prossegueAgente();
                        break;
                    case "2": 
                        gerenciarMultasGeral();
                        prompt("Enter para voltar...");
                        break;
                    case "3": 
                        verDadosAgente();
                        break;
                    case "4": 
                        console.log(sistema.listarTodosVeiculos());
                        prompt("Enter para voltar...");
                        break;
                    case "5":
                        menuBuscaPlaca(); 
                        break;
                    
                    default:
                        console.log("Opção inválida!");

                }
               }

     
            
            //Se está logado e não é agente, é condutor
            else{
                console.log("**Você está logado como: CONDUTOR**");
                console.log("0. Sair");
                console.log("1. Ver meus dados");
                console.log("2. Cadastrar veículos");
                console.log("3. Ver meus veículos");
                console.log("4. Ver minhas multas");

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
                        case "4":
                            exibirMultas();
                        default:
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
    prompt("Pressione ENTER para voltar ...");
}

function prossegueAgente() {
    
        // Lista os condutores automaticamente
        console.log(sistema.listarCondutores());


        //Prosseguirá se um ID válido for inserido
        const idCondutor = prompt("Digite o ID do condutor para gerenciar (ou ENTER para voltar): ");
        const condutorAlvo = sistema.buscarCondutor(idCondutor);
        if (condutorAlvo) {
            menuAcoes(condutorAlvo);
        }
        else if (idCondutor) {
            console.log("Condutor não encontrado.");
            prompt("Enter para continuar...");
        }


    
}

function verDados() {
    console.log("\n** MEUS DADOS **");
    console.log(`Nome: ${sistema.usuariologado.nome}`);
    console.log(`CPF: ${sistema.usuariologado.cpf}`);
    console.log(`Data de Nascimento: ${sistema.usuariologado.nascimento}`);
    console.log(`Email: ${sistema.usuariologado.email}`);
}

function verDadosAgente() {
    const agente = sistema.usuariologado;
    
    console.log("\n=== DADOS DO AGENTE ===");
    console.log(`Nome: ${agente.nome}`);
    console.log(`Matrícula: ${agente.matricula}`); 
    console.log(`CPF: ${agente.cpf}`);
    console.log(`Email: ${agente.email}`);
    
    prompt("Pressione ENTER para voltar...");
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

function menuAcoes(condutor) {
    let noSubMenu = true;
   
    while (noSubMenu) {
        console.log(`\n=== GERENCIANDO: ${condutor.nome.toUpperCase()} (ID: ${condutor.id}) ===`);
        console.log("0. Voltar");
        console.log("1. Ver Detalhes Completos");
        console.log("2. Aplicar Multa");
        console.log("3. Ver e alterar multas ")


        const op = prompt("Opção: ");


        switch (op) {


            case "0":
                noSubMenu = false; // volta para o menu do Agente
                break;


            case "1":
                console.log("\n--- MAIS INFORMAÇÕES ---");
                console.log(`Nome: ${condutor.nome}`);
                console.log(`CPF: ${condutor.cpf}`);
                console.log(`Nascimento: ${condutor.nascimento}`);
                console.log(`Email: ${condutor.email}`);
                console.log(`Veículos cadastrados: ${condutor.veiculos.length}`);
                prompt("Enter para continuar...");
                break;


            case "2":
                console.log("\n--- APLICAR MULTA ---");
                const motivo = prompt("Motivo: ");
                const valor = prompt("Valor (R$): ");
                const data = prompt("Data: ")
           
                sistema.aplicarMulta(condutor, motivo, valor,data);


                prompt("Enter para continuar...");
                break;

            case "3": 
                console.log(`\n--- MULTAS DE ${condutor.nome} ---`);
                
                // Lista as multas do condutor
                if (condutor.multas.length === 0) {
                    console.log("Este condutor não possui multas.");
                } else {
                    condutor.multas.forEach(m => {
                        console.log(`[ID: ${m.id}] R$${m.valor} - ${m.tipo} (Status: ${m.status})`);
                    });

                    // Pede o ID da multa
                    const idMulta = prompt("\nDigite o ID da multa para alterar (ou ENTER para sair): ");

                    if (idMulta) {
                        //Menu de Seleção de Status
                        console.log("\nEscolha o novo status:");
                        console.log("1. Pendente");
                        console.log("2. Paga");
                        console.log("3. Cancelada");
                        console.log("4. Recorrida");
                        
                        const opcaoStatus = prompt("Escolha uma opção: ");
                        let novoStatus = null;
                        
                        switch(opcaoStatus) {
                            case "1": novoStatus = "Pendente"; break;
                            case "2": novoStatus = "Paga"; break;
                            case "3": novoStatus = "Cancelada"; break;
                            case "4": novoStatus = "Recorrida"; break;
                            default: console.log("Opção inválida.");
                        }

                        if (novoStatus) {
                            sistema.alterarStatusMulta(idMulta, novoStatus);
                        }
                    }
                }
                prompt("Enter para continuar...");
                break;

            default:
                console.log("Opção inválida.");
        }
    }
}

//função do condutor para ver suas multas
function exibirMultas() {
    let noMenu = true;

    while (noMenu) {
        console.clear();
        //Mostra a lista 
        console.log(sistema.verMinhasMultas());

        // Se a lista estiver vazia ou com erro, encerra aqui
        if (!sistema.usuariologado.multas || sistema.usuariologado.multas.length === 0) {
            prompt("Pressione ENTER para voltar...");
            noMenu = false;
            break;
        }

        
        console.log("\n[Digite o ID da multa ou ENTER para voltar]");
        const idInput = prompt("ID da Multa: ");

        if (!idInput) {
            noMenu = false; 
        } 
        else {
            //Verifica se a multa pertence a este condutor
            const minhaMulta = sistema.usuariologado.multas.find(m => m.id === Number(idInput));


            if (!minhaMulta) {
                console.log("Essa multa não existe ou não pertence a você.");
                prompt("Enter para voltar...");
            } 
            else {
                console.log("\n--- RESOLVER PENDÊNCIA ---");
                console.log(`Multa Selecionada: ${minhaMulta.tipo} (R$ ${minhaMulta.valor})`);
                console.log("1. PAGAR");
                console.log("2. RECORRER");
                const acaomulta = prompt("Escolha uma opção: ");
                
                switch (acaomulta){
                    case "1":
                        sistema.alterarStatusMulta(idInput, "Paga");
                        console.log("\n✅ MULTA PAGA COM SUCESSO.");
                        prompt("Pressione ENTER para atualizar a lista...");
                        break;
                    case "2":
                        sistema.alterarStatusMulta(idInput, "Recorrida");
                    
                        console.log("\n⚠️ PROCESSO INICIADO: Multa Recorrida.");
                        prompt("Pressione ENTER para atualizar a lista...");
                        break;
                    default:
                        console.log("Opção inválida ");
                        prompt("Enter pra voltar... ");
                        break;
                }
                }
        }

}
}


//agente pode alterar uma multa também pela lista geral
function gerenciarMultasGeral() {
    let noMenuMultas = true;

    while (noMenuMultas) {
        console.clear();
        
        console.log(sistema.verMultas());

        if (sistema.multas.length === 0) {
            prompt("Pressione ENTER para voltar...");
            noMenuMultas = false; 
            break;
        }

        console.log("\n[Digite o ID da multa para alterar o status ou ENTER para voltar]");
        const idMulta = prompt("ID da Multa: ");

        if (!idMulta) {
            // Se apertou Enter vazio, sai do loop
            noMenuMultas = false;
        } 
        else {
    
            console.log("\nEscolha uma opção:");
            console.log("1. Pendente");
            console.log("2. Paga");
            console.log("3. Cancelada");
            console.log("4. Recorrida");
            
            const opcaoStatus = prompt("Escolha uma opção: ");
            let novoStatus = null;

            switch(opcaoStatus) {
                case "1": novoStatus = "Pendente"; break;
                case "2": novoStatus = "Paga"; break;
                case "3": novoStatus = "Cancelada"; break;
                case "4": novoStatus = "Recorrida"; break;
                default: console.log("Opção inválida.");
            }

            if (novoStatus) {
                sistema.alterarStatusMulta(idMulta, novoStatus);
                prompt("Enter para continuar...");
            } else {
                prompt("Nenhuma alteração feita. Enter para continuar...");
            }
        }
    }
    }

function menuBuscaPlaca() {
    console.clear();
    console.log("\n=== CONSULTA DE PLACA ===");
    const placa = prompt("Digite a placa para pesquisar: ");

    const resultado = sistema.buscarPorPlaca(placa);

    if (resultado.sucesso) {
        const v = resultado.carro;
        const dono = resultado.dono;

        console.log("\n VEÍCULO LOCALIZADO!");
        console.log("--------------------------------");
        console.log(`Veículo: ${v.marca} ${v.modelo} | Cor: ${v.cor} | Placa: ${v.placa.toUpperCase()}`);
        console.log("--------------------------------");
        console.log(`PROPRIETÁRIO: ${dono.nome}`);
        console.log(`CPF: ${dono.cpf}`);
        console.log(`Status Carteira: ${dono.multas.length > 0 ? " Possui Multas" : "Regular"}`);
    } else {
        console.log("\n Veículo não encontrado no sistema.");
    }

    prompt("Pressione ENTER para voltar...");
}


// Inicia o programa
main();