function CarteirasDAO(connection) {
    this._connection = connection;
}

CarteirasDAO.prototype.lista = function (callback) {
    this._connection.query('select * from transection_shares', callback);
}

CarteirasDAO.prototype.salva = function (carteira, callback) {
    // gravar no banco todos os TICKERS para conseguiur gravar corretamente
    // this._connection.query('insert into shares (ticker, company_name, sector) values (?, ?, ?)', [carteira.ticker, carteira.company_name, carteira.sector],callback);
    //
    // this._connection.query('insert into buy_shares (date_buy, quantity, price) values (?, ?, ?)', [carteira.date_buy, carteira.quantity, carteira.price],callback);
}

module.exports = function () {
    return CarteirasDAO;
}
