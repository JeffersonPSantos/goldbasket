module.exports = function (app) {

    // lista a página de transações
    app.get('/transactions/stocks', function (req, res, next) {

        var connection = app.infra.connectionFactory();
        var stockDAO = new app.infra.stockDAO(connection);

        stockDAO.list(function (error, results) {
            if (error) {
                return next(error);
            }

            var transactions = formatData(results);

            res.format({
                html: function () {
                    res.render('transactions/stocks/list', {list:transactions, error:{}});
                },
                json: function () {
                    res.json(transactions);
                }
            });
        });
        connection.end();
    });

    // lista os tickers das 'ações' para um <input>
    var stocksList = function (req, res, next) {
        var connection = app.infra.connectionFactory();
        var stockDAO = new app.infra.stockDAO(connection);

        stockDAO.tickersList(function (error, results) {
            if (error) {
                return next(error);
            }
            res.render('transactions/stocks/form', {tickers:results, errorValidation:{}});
        });
        connection.end();
    }

    // formulário que adiciona transações em compra/venda de 'ações'
    app.get('/transactions/stocks/form', stocksList);

    // controller: cadastra transações de compra/venda de 'ações'
    app.post('/transactions/stocks', function (req, res, next) {

        var transaction = req.body;

        calcTransactionValues(transaction);

        validateDataForm(req);

        var connection = app.infra.connectionFactory();
        var stockDAO = new app.infra.stockDAO(connection);

        stockDAO.save(transaction, function (error, results) {
            if (error) {
                return next(error);
            }
            res.redirect('/transactions/stocks');
        });
        connection.end();
    });

    // controller que remove transactions da list
    app.post('/transactions', function (req, res, next) {

        var ids = req.body.ids;

        for (var i = 0; i < ids.length; i++) {
            var connection = app.infra.connectionFactory();
            var stockDAO = new app.infra.stockDAO(connection);

            stockDAO.remove(ids[i], function (error, results) {
            });

            connection.end();
        }
        res.redirect('transactions/stocks');
    });
}

function formatData(data){
    // formata os dados do 'results'
    var string = JSON.stringify(data);
    var json = JSON.parse(string);
    for (var i = 0; i < json.length; i++) {
        var date = json[i].date.match(/(.*)-(.*)-(.*)T(.*)/);
        var dateFormatted = date[3]+'/'+date[2]+'/'+date[1];
        var priceFormatted = json[i].price.toFixed(2).replace('.',',');
        var costFormatted = json[i].cost.toFixed(2).replace('.',',');
        var brokerageFormatted = json[i].brokerage.toFixed(2).replace('.',',');
        var valueFormatted = json[i].total_value.toFixed(2).replace('.',',');
        json[i].date = dateFormatted;
        json[i].price = priceFormatted;
        json[i].cost = costFormatted;
        json[i].brokerage = brokerageFormatted;
        json[i].total_value = valueFormatted;
    }
    return json;
}

function calcTransactionValues(transaction) {
    var quantity = parseInt(transaction['quantity']);
    var price = parseFloat(transaction['price']);
    var brokerage = parseFloat(transaction['brokerage']);
    transaction.cost = calcCost(quantity, price, brokerage);
    transaction.total_value = quantity * price + brokerage;
}

function calcCost(quantity, price, brokerage) {

    var emoluments = 0.00004842;
    var liquidation = 0.000275;
    var stockValue = quantity * price;

    var operationalCost = ((stockValue * (emoluments + liquidation)) + brokerage);

    return operationalCost;
}

function validateDataForm(req) {

    req.assert('ticker', 'Ticker é obrigatório').notEmpty();
    req.assert('date','Data é obrigatória').notEmpty();
    req.assert('quantity','Quantidade é obrigatória').notEmpty();
    req.assert('price','Preço é obrigatório').notEmpty();
    req.assert('brokerage','Corretagem é obrigatória').notEmpty();

    var error = req.validationErrors();

    if (error) {
        res.format({
            html: function () {
                //res.status(400).render('carteiras/transactions-form', {errorValidation:error, tickers:{}});
                app.get('transactions/stocks/form', stocksList);
            },
            json: function () {
                res.status(400).json(error);
            }
        });
        return;
    }
}
