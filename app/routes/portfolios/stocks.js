module.exports = function (app) {

    app.get('/portfolios/stocks', function (req, res, next) {

        var connection = app.infra.connectionFactory();
        var transactionStock = new app.infra.stockDAO(connection);

        transactionStock.listOrdenaded(function (error, results) {
            res.render('portfolios/stocks', {transaction : results});

            var tickers = calcPortfolio(results);
            console.log(tickers);

            for (var i = 0; i < tickers.length; i++) {
                transactionStock.listPort(tickers[i], function (error, re) {
                    calcTeste(re);
                });
            }

        });
    });
}

// funções que definem a regra de negócio


function calcTeste(list){
    var a = [];
    list.forEach(function (item) {

        if (item.quantity) a.push(item.quantity)

    });
    console.log(a);

}

function calcPortfolio(transactions) {

    var tickers = [];

    for (var i = 0; i < transactions.length; i++) {
        tickers.push(transactions[i].ticker);
    }

    return repetidos(tickers);
}

function repetidos(array) {
    var iguais = [];
    var iguais2 = [];
    var i = 0;
    for (var i = 0; i < array.length; i++) {
        if (array.indexOf(array[i]) != i) {
            iguais.push(array[i]);
        }
    }

    if (iguais.length) {
        for (var i = 0; i < iguais.length; i++) {
            if (iguais.indexOf(iguais[i]) == i) {
                iguais2.push(iguais[i]);
            }
        }
    }
    return iguais2;
}























// function calcCostBasis(quantity, price, brokerage) {
//
//     var emoluments = 0.00004842;
//     var liquidation = 0.000275;
//     var stockValue = quantity * price;
//
//     var operationalCost = ((stockValue * (emoluments + liquidation)) + brokerage);
//     var costBasis = operationalCost + stockValue;
//
//     return costBasis;
// }

//
// function calculaGanho(corretagem, quantidade, preco) {
//     var valor = quantidade * preco;
//     var custo = calculaCusto(corretagem, quantidade, preco);
//     var ganho = valor - custo;
//
//     return ganho;
// }
//
// function calculaRetorno(corretagem, quantidade, preco) {
//     var valor = preco * quantidade;
//     var custo = calculaCusto(corretagem, quantidade, preco);
//     var retorno = ((valor / custo)-1) * 100;
//
//     return retorno;
// }


///
// var j = 1;
// var x = 1;
// var teste = [];
// var quantidade = 0;
// var novaQtd = 0;
//
// for (var i = 0; i < transactions.length; i++) {
//
//     quantidade = transactions[i].quantity;
//
//     while (j < transactions.length) {
//         //console.log(quantidade);
//         if (transactions[i].ticker == transactions[j].ticker  && x != i) {
//             console.log(transactions[i].ticker);
//             console.log(transactions[j].quantity);
//             //quantidade += transactions[j].quantity;
//             //console.log(quantidade);
//             //teste.push(transactions[i].quantity + transactions[j].quantity);
//             x++;
//         }
//         novaQtd = quantidade;
//         break;
//         j++;
//     }
//     j = x;
// }
