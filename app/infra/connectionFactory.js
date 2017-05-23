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

    if(process.env.NODE_ENV == 'test'){
        return mysql.createConnection({
                    host: 'localhost',
                    user: 'admin',
                    password: '',
                    database: 'goldbasket_test'
                });
    }

    if (process.env.NODE_ENV == 'production') {
        var url = process.env.CLEARDB_DATABASE_URL;
        var grupos = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
        return mysql.createConnection({
            host: grupo[3],
            user: grupo[1],
            password: grupo[2],
            database: grupo[4]
        });
    }
}

module.exports = function () {
    return createDBConnection;
}
