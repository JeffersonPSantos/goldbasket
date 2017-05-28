module.exports = function (app) {

    // página das transações em compra/venda de 'ações'
    app.get('/transacoes/acoes', function (req, res, next) {

        var connection = app.infra.connectionFactory();
        var shareDAO = new app.infra.shareDAO(connection);

        shareDAO.list(function (error, results) {
            if (error) {
                return next(error);
            }

            // formata os dados do 'results'
            var string = JSON.stringify(results);
            var json = JSON.parse(string);
            for (var i = 0; i < json.length; i++) {
                var date = json[i].date.match(/(.*)-(.*)-(.*)T(.*)/);
                var dateFormatted = date[3]+'/'+date[2]+'/'+date[1];
                var priceFormatted = json[i].price.toFixed(2).replace('.',',');
                var costFormatted = json[i].cost.toFixed(2).replace('.',',');
                var valueFormatted = json[i].total_value.toFixed(2).replace('.',',');
                json[i].date = dateFormatted;
                json[i].price = priceFormatted;
                json[i].cost = costFormatted;
                json[i].total_value = valueFormatted;
            }

            res.format({
                html: function () {
                    res.render('transacoes/acoes/lista', {list:json, error:{}});
                },
                json: function () {
                    res.json(json);
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

    // controller que remove transacoes da lista
    app.delete('/transacoes/acoes/:id', function (req, res, next) {

        var id = req.params.id;

        var trasaction = {
            id_transaction:id
        }

        var connection = app.infra.connectionFactory();
        var shareDAO = new app.infra.shareDAO(connection);
        shareDAO.remove(trasaction, function (error, results) {
            res.redirect('/transacoes/acoes');
        });

    });
}
