const Condutor = require('./Condutor');
const Agente = require('./Agente');
const Veiculo = require('./Veiculo');
const Multa = require('./Multa');

class Sistema {
    constructor() {
        // Banco de dados na memória
        this.condutores = [];
        this.agentes = [];
        this.multas = [];
        

        // Guarda a situação atual de login
        this.usuariologado = null;
    }


    // **CADASTRO**
        
    // Cadastra um condutor 
    cadastroCondutor(nome, cpf, nascimento, email, senha) {
        // Gera pro condutor seu ID
        const id = this.condutores.length + 1;

        // Cria o objeto Condutor
        const novoCondutor = new Condutor(id, nome, cpf, nascimento, email, senha);

        // Guarda o novo condutor na lista
        this.condutores.push(novoCondutor);

        console.log(`Motorista ${nome} cadastrado com ID ${id}.`);
    }
    
    // Cadastra um agente
    cadastroAgente(nome, cpf, email, senha, matricula) {
        const id = this.agentes.length + 1;

        const novoAgente = new Agente(id, nome, cpf, email, senha, matricula);

        this.agentes.push(novoAgente);

        console.log(`Admin: Agente ${nome}, de ID: ${id}, criado com sucesso.`);
    }    

    // **AUTENTICAÇÃO**

    login(email, senha) {
        //Checa se o email inserido é de um agente
        const findAgente = this.agentes.find(agente => agente.email === email);

        if (findAgente) {
            // Tendo encontrado o email, testa a senha digitada
            
            if (findAgente.verificação(senha)) {
                this.usuariologado = findAgente; 
                return "Agente";
            }
        }
        
        // Checa se o email inserido é de um condutor
        const findCondutor = this.condutores.find(condutor => condutor.email === email);

        if (findCondutor) {
            // Tendo encontrado o email, testa a senha digitada
            if (findCondutor.verificação(senha)) {
                this.usuariologado = findCondutor; 
                return "Condutor";
            }
        }
        
        // Caso onde não foi encontrado email equivalente ou senha incorreta
        return null;
    } 

    // Saída do sistema
    logout() {
        this.usuariologado = null;
        console.log("Logout realizado com sucesso.");
    }


    //**MÉTODOS AGENTE**/

    listarCondutores() {

        //Lista estando vazia retorna a mensagem
        if (this.condutores.length === 0) {
           return "Nenhum condutor cadastrado.";    
        }

        let controlecondutores = "\n **LISTA DE CONDUTORES** \n";

       this.condutores.forEach(condutor => {
            controlecondutores += `${condutor.nome} [ID: ${condutor.id}]\n`;
        });
        return controlecondutores;   
    }
    
    //encontra um condutor referente ao ID
    buscarCondutor(id){
        return this.condutores.find(condutor => condutor.id === Number(id) );
    }

    aplicarMulta(condutorAlvo, tipo, valor, data) {
        // Gera ID único para a multa
        const idMulta = this.multas.length + 1;
       
        // Cria a multa (Status inicial: "Pendente")
        const novaMulta = new Multa(idMulta, condutorAlvo.id, tipo, valor, data, "Pendente");


        // Salva na lista GERAL do sistema
        this.multas.push(novaMulta);


        // Salva na lista PESSOAL do condutor
        condutorAlvo.multas.push(novaMulta);


        console.log(`\nSUCESSO: Multa #${idMulta} aplicada ao condutor ${condutorAlvo.nome}.`);
    }

    verMultas() {
        if (this.multas.length === 0) {
            return "Nenhuma multa registrada no sistema.";
        }

        let relatorio = "\n=== RELATÓRIO GERAL DE INFRAÇÕES ===\n";
        
        this.multas.forEach(multa => {
            // Tenta achar o nome do condutor pelo ID
            const nomeCondutor = this.condutores.find(c => c.id === multa.idCondutor)?.nome || "Desconhecido";
            
            relatorio += `[ID: ${multa.id}] Data: ${multa.data} | Valor: R$${multa.valor} | Status: ${multa.status}\n`;
            relatorio += `       Motivo: ${multa.tipo}\n`;
            relatorio += `       Infrator: ${nomeCondutor}\n`;
            relatorio += "------------------------------------------------\n";
        });

        return relatorio;
    }

    //LISTAGEM DE VEÍCULOS(serão usados dois loops para criar a lista) 
    listarTodosVeiculos() {

        let relatorio = "\n=== FROTA CADASTRADA ===\n";
        let totalVeiculos = 0;

        // 1º Loop: Entra em cada Condutor
        this.condutores.forEach(condutor => {
            
            // Verifica se esse condutor tem carros
            if (condutor.veiculos.length > 0) {
                // 2º Loop: Lista os veiculos desse condutor
                condutor.veiculos.forEach(veiculo => {
                    relatorio += `${veiculo.marca} ${veiculo.modelo} (${veiculo.cor} - [PLACA: ${veiculo.placa}])\n`;
                    relatorio += `   Proprietário: ${condutor.nome} (ID: ${condutor.id})\n`; 
                    relatorio += "----------------------------------\n";
                    totalVeiculos++;
                });
            }
        });

        if (totalVeiculos === 0) {
            return "Nenhum veículo foi cadastrado ainda.";
        }

        return relatorio;
    }


    alterarStatusMulta(idMulta, novoStatus) {
        // Busca a multa na lista geral (que é a mesma referência da lista individual)
        const multa = this.multas.find(m => m.id === Number(idMulta));

        if (multa) {
            multa.status = novoStatus;
            console.log(`\n Status da multa #${idMulta} alterado para "${novoStatus}".`);
            return true;
        } else {
            console.log("ERRO: Multa não encontrada.");
            return false;
        }
    }

    buscarPorPlaca(placaBusca) {
        // Percorre cada condutor cadastrado no sistema
        for (const condutor of this.condutores) {
            
            // Tenta encontrar o veículo dentro da lista deste condutor
            // (Compara transformando tudo em maiúsculo para evitar erro de digitação)
            const veiculoEncontrado = condutor.veiculos.find(v => v.placa.toUpperCase() === placaBusca.toUpperCase());

            if (veiculoEncontrado) {
                // Se achou, retorna um objeto com tudo que o agente precisa saber
                return {
                    sucesso: true,
                    carro: veiculoEncontrado,
                    dono: condutor
                };
            }
        }

        return { sucesso: false };
    }

    //**MÉTODOS CONDUTOR**/

    cadastroVeiculo(placa, modelo, marca, cor) {

        const novoVeiculo = new Veiculo(placa, modelo, marca, cor);

        this.usuariologado.veiculos.push(novoVeiculo);

        console.log(`Veículo ${marca} ${modelo} de placa "${placa}" cadastrado .`);
    }
    
    listarVeiculos() {

        //Lista estando vazia retorna a mensagem
        if (this.usuariologado.veiculos.length === 0) {
            return "Nenhum veículo cadastrado.";
        }
        let controleVeiculos = "________\n";


        this.usuariologado.veiculos.forEach(veiculo => {
            controleVeiculos += `${veiculo.marca} ${veiculo.modelo} ${veiculo.cor} (Placa: ${veiculo.placa})\n`;
        });

        return controleVeiculos;
    }

    verMinhasMultas() {

        const minhasMultas = this.usuariologado.multas;



        let relatorio = "\n=== MINHAS MULTAS ===\n";
        
        minhasMultas.forEach(multa => {
            relatorio += `Data: ${multa.data} | Valor: R$${multa.valor} | Status: ${multa.status} | ID: ${multa.id} \n`;
            relatorio += `Motivo: ${multa.tipo}\n`;
            relatorio += "------------------------------\n";
        });

        return relatorio;
    }


    








}

module.exports = Sistema;





