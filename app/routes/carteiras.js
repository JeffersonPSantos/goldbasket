module.exports = function (app) {

    var listaCarteiras = function (req, res, next) {

        var connection = app.infra.connectionFactory();
        var carteirasDAO = new app.infra.carteirasDAO(connection);

        carteirasDAO.lista(function (err, results) {
            if (err) {
                return next(err);
            }
            res.format({
                html: function () {
                    res.render('carteiras/acoes', {lista:results, erros:{}});
                },
                json: function () {
                    res.json(results);
                }
            });
        });
        connection.end();
    }

    app.get('/carteiras', listaCarteiras);

    // controller: cadastro de transações de ações
    app.post('/carteiras', function (req, res, next) {

        var carteira = req.body;

        // valida dados do formulário
        req.assert('date_buy','Data é obrigatória').notEmpty();
        req.assert('quantity','Quantidade é obrigatória').notEmpty();
        req.assert('price','Preço é obrigatória').notEmpty();

        var erros = req.validationErrors();
        if (erros) {
            res.format({
                html: function () {
                    res.status(400).render('carteiras/acoes', {erros:erros, lista:{}});
                },
                json: function () {
                    res.status(400).json(erros);
                }
            });
            return;
        }

        var connection = app.infra.connectionFactory();
        var carteirasDAO = new app.infra.carteirasDAO(connection);

        carteirasDAO.salva(carteira, function (err, results) {
            res.redirect('/carteiras');
        });
        connection.end();
    });
}
