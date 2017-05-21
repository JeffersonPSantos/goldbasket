function ShareDAO(connection) {
    this._connection = connection;
}

ShareDAO.prototype.list = function (callback) {
    this._connection.query('select * from shares_transaction',  callback);
}

ShareDAO.prototype.tickersList = function (callback) {
    this._connection.query('select * from shares', callback);
}

ShareDAO.prototype.save = function (share, callback) {
    this._connection.query('insert into shares_transaction (type, ticker, date, quantity, price, cost, total_value) values (?, ?, ?, ?, ?, ?, ?)', [share.type, share.ticker, share.date, share.quantity, share.price, share.cost, share.total_value], callback);
}

module.exports = function () {
    return ShareDAO;
}
