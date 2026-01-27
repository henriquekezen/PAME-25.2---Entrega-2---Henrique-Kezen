class Agente {
    #senha;

    constructor(id, nome, cpf, email, senha, matricula){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.#senha = senha;
        this.matricula = matricula;
    }

    verificacao(trysenha){
        return this.#senha === trysenha;
    }
}
module.exports = Agente;