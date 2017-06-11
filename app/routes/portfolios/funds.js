module.exports = function (app) {
    app.get('/portfolios/funds', function (req, res, next) {
        res.render('portfolios/funds');
    });
}
