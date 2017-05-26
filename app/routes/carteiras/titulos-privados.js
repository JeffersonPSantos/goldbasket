module.exports = function (app) {
    app.get('/portfolio/titulos-privados', function (req, res, next) {
        res.render('carteiras/titulos-privados');
    });
}
