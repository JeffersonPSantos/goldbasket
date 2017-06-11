module.exports = function (app) {
    app.get('/portfolios/government-bonds', function (req, res, next) {
        res.render('portfolios/government-bonds');
    });
}
