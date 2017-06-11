function StockDAO(connection) {
    this._connection = connection;
}

StockDAO.prototype.list = function (callback) {
    this._connection.query('select * from shares_transaction',  callback);
}

StockDAO.prototype.listOrdenaded = function (callback) {
    this._connection.query('select * from shares_transaction order by ticker', callback);
}

StockDAO.prototype.listPort = function (stock, callback) {

    this._connection.query('select sum(quantity) as quantity from shares_transaction where ticker = ?', [stock], callback);
    // this._connection.query('select avg(cost) as cost from shares_transaction where ticker = ?', [stock], callback);
    // this._connection.query('select avg(price) as price from shares_transaction where ticker = ?', [stock], callback);
}

StockDAO.prototype.tickersList = function (callback) {
    this._connection.query('select * from shares', callback);
}

StockDAO.prototype.save = function (stock, callback) {
    this._connection.query('insert into shares_transaction (type, ticker, date, quantity, price, total_value, cost, brokerage) values (?, ?, ?, ?, ?, ?, ?, ?)', [stock.type, stock.ticker, stock.date, stock.quantity, stock.price, stock.total_value, stock.cost, stock.brokerage], callback);
}

StockDAO.prototype.remove = function (stock, callback) {
    this._connection.query('delete from shares_transaction where id_transaction = ?', stock, callback);
}

module.exports = function () {
    return StockDAO;
}
