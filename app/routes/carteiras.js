module.exports = function (app) {
    app.get('/carteira/lista', function (req, res) {

        var connection = app.infra.connectionFactory();
        var carteirasDAO = new app.infra.carteirasDAO(connection);

        carteirasDAO.lista(function (err, results) {
            res.render('carteiras/lista', {
                lista: results
            });
        });

        connection.end();
    });

    // app.get('/carteira/acoes', function (req, res) {
    //     res.render('carteiras/acoes');
    // });
}
