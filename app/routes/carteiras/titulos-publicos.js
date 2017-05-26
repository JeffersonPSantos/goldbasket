module.exports = function (app) {
    app.get('/portfolio/titulos-publicos', function (req, res, next) {
        res.render('carteiras/titulos-publicos');
    });
}
