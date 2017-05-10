function calculaCusto(corretagem, quantidade, preco) {
    var emolumentos = 0.00004842;
    var liquidacao = 0.000275;
    var qtd_acoes = parseInt(quantidade);
    var valor_acoes = qtd_acoes * parseFloat(preco);

    var custo_operacional = (valor_acoes * (emolumentos + liquidacao)) + parseFloat(corretagem);
    var custo = custo_operacional + valor_acoes;

    return custo;
}

function calculaGanho(corretagem, quantidade, preco) {
    var valor = quantidade * preco;
    var custo = calculaCusto(corretagem, quantidade, preco);
    var ganho = valor - custo;

    return ganho;
}

function calculaRetorno(corretagem, quantidade, preco) {
    var valor = preco * quantidade;
    var custo = calculaCusto(corretagem, quantidade, preco);
    var retorno = ((valor / custo)-1) * 100;

    return retorno;
}
