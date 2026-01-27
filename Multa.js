class Multa {
    constructor(id, idCondutor, tipo, valor, data, status){
        this.id = id;
        this.idCondutor = idCondutor; //vincula multa ao ID do motorista
        this.tipo = tipo; //velocidade, sinal,etc
        this.valor = valor;
        this.data = data;
        this.status = status; //pendente,paga,etc
    }
}
module.exports = Multa;