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
        let controleVeiculos = "\n **MEUS VEÍCULOS** \n";


        this.usuariologado.veiculos.forEach(veiculo => {
            controleVeiculos += `${veiculo.marca} ${veiculo.modelo} ${veiculo.cor} (Placa: ${veiculo.placa})\n`;
        });

        return controleVeiculos;
    }
}

module.exports = Sistema;





