module.exports = function (app) {

    // página das transações em compra/venda de 'ações'
    app.get('/transacoes/acoes', function (req, res, next) {

        var connection = app.infra.connectionFactory();
        var shareDAO = new app.infra.shareDAO(connection);

        shareDAO.list(function (error, results) {
            if (error) {
                return next(error);
            }
            // formata a propriedade data
            var string = JSON.stringify(results);
            var json = JSON.parse(string);
            var date = json[0].date.match(/(.*)-(.*)-(.*)T(.*)/);
            var date_formated = date[3]+'/'+date[2]+'/'+date[1];
            json[0].date = date_formated;

            res.format({
                html: function () {
                    res.render('transacoes/acoes/lista', {list:json, error:{}});
                },
                json: function () {
                    res.json(results);
                }
            });
        });
        connection.end();
    });

    // lista tickers das 'ações' para um <input>
    var sharesList = function (req, res, next) {
        var connection = app.infra.connectionFactory();
        var shareDAO = new app.infra.shareDAO(connection);

        shareDAO.tickersList(function (error, results) {
            if (error) {
                return next(error);
            }
            res.render('transacoes/acoes/form', {tickers:results, errorValidation:{}});
        });
        connection.end();
    }

    // formulário que adiciona transações em compra/venda de 'açoẽs'
    app.get('/transacoes/acoes/form', sharesList);

    // controller: cadastra transações de compra/venda de 'ações'
    app.post('/transacoes/acoes', function (req, res, next) {

        var trasaction = req.body;

        // calcula 'valor total' da transação
        var quantity = parseInt(trasaction['quantity']);
        var price = parseFloat(trasaction['price']);
        var cost = parseFloat(trasaction['cost']);
        trasaction.total_value = quantity * price + cost;

        // valida dados do formulário
        req.assert('ticker', 'Ticker é obrigatório').notEmpty();
        req.assert('date','Data é obrigatória').notEmpty();
        req.assert('quantity','Quantidade é obrigatória').notEmpty();
        req.assert('price','Preço é obrigatório').notEmpty();
        req.assert('cost','Corretagem é obrigatória').notEmpty();

        var error = req.validationErrors();
        if (error) {
            res.format({
                html: function () {
                    //res.status(400).render('carteiras/transacoes-form', {errorValidation:error, tickers:{}});
                    app.get('/transacoes/acoes/form', sharesList);
                },
                json: function () {
                    res.status(400).json(error);
                }
            });
            return;
        }

        console.log(trasaction);

        var connection = app.infra.connectionFactory();
        var shareDAO = new app.infra.shareDAO(connection);

        shareDAO.save(trasaction, function (error, results) {
            if (error) {
                return next(error);
            }
            res.redirect('/transacoes/acoes');
        });
        connection.end();
    });
}
