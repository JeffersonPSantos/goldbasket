var express = require('../config/express')();
var request = require('supertest')(express);
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('mysql');

describe('Transaction Controller', function () {

    if (process.NODE_ENV == 'test') {
        before(function (done) {
            databaseCleaner.clean(express.infra.connectionFactory(), function () {
                done();
            });
        });
    }

    it('#cadastro de acoes tudo preenchido', function (done) {
        request.post('/transacoes/acoes')
        .send({
            type:'buy',
            ticker:'RAIL3',
            date:'2017-05-21',
            quantity:300,
            price:9.80,
            cost:21.45
        })
        .expect(302)
        .end(function (error, response) {
            done();
        })
    });

    it('#listagem de acoes html',function (done) {
        request.get('/transacoes/acoes')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect(200, done)
    });

    it('#listagem de acoes json', function (done) {
        request.get('/transacoes/acoes')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
});
