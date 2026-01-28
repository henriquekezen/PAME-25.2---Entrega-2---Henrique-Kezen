class Condutor {
    #senha; //encapsula dado confidencial

    constructor(id, nome, cpf, nascimento, email, senha) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.nascimento = nascimento;
        this.email = email;
        this.#senha = senha;
        this.veiculos = []; //listas vazias pra guardar informações do condutor
        this.multas = [];
    }

    verificação(trysenha) {
        return this.#senha === trysenha;
    }

    adicionarVeiculo(veiculo) {
        this.veiculos.push(veiculo)
    }
}

module.exports = Condutor;
