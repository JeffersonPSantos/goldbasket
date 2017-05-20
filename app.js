var app = require('./config/express')();

app.listen(4000, function() {
    console.log('Server running...');
});
