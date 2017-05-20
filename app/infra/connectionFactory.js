var mysql = require('mysql');

function createDBConnection() {
    if(!process.env.NODE_ENV){
        return mysql.createConnection({
                    host: 'localhost',
                    user: 'admin',
                    password: '',
                    database: 'goldbasket'
                });
    }

    if(process.env.NODE_ENV == 'test')
        return mysql.createConnection({
                    host: 'localhost',
                    user: 'admin',
                    password: '',
                    database: 'goldbasket_test'
                });
}

module.exports = function () {
    return createDBConnection;
}
