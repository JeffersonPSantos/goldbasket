var mysql = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
                host: 'localhost',
                user: 'admin',
                password: '',
                database: 'goldbasket'
            });
}

module.exports = function () {
    return createDBConnection;
}
