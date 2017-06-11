module.exports = function (app) {
    app.get('/portfolios/private-bonds', function (req, res, next) {
        res.render('portfolios/private-bonds');
    });
}
