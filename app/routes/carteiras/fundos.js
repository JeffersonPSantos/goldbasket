module.exports = function (app) {
    app.get('/portfolio/fundos', function (req, res, next) {
        res.render('carteiras/fundos');
    });
}
