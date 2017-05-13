module.exports = function (app) {

    var listaCarteiras = function (req, res) {

        var connection = app.infra.connectionFactory();
        var carteirasDAO = new app.infra.carteirasDAO(connection);

        carteirasDAO.lista(function (err, results) {
            res.render('carteiras/acoes', {
                lista: results
            });
        });
        connection.end();
}

    app.get('/carteiras', listaCarteiras);

    app.post('/carteiras', function (req, res) {

        var carteira = req.body;
        console.log(carteira);
        var connection = app.infra.connectionFactory();
        var carteirasDAO = new app.infra.carteirasDAO(connection);

        carteirasDAO.salva(carteira, function (err, results) {
            res.redirect('/carteiras');
        });
        connection.end();
    });
}
