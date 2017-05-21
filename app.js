var app = require('./config/express')();
var http = require('http').Server(app);

var port = process.env.PORT || 3000;
var server = http.listen(port, function() {

    var host = server.address().address;
    var server_port = server.address().port;
    console.log('Server running at http://%s:%s', host, server_port);
});
