function CarteirasDAO(connection) {
    this._connection = connection;
}

CarteirasDAO.prototype.lista = function (callback) {
    this._connection.query('select * from shares', callback);
}

module.exports = function () {
    return CarteirasDAO;
}
