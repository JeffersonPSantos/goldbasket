var express = require('../config/express')();
var request = require('supertest')(express);

describe('CarteirasController', function () {

    it('#listagem de acoes html',function (done) {
        request.get('/carteiras')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect(200, done);
    });

    it('#listagem de acoes json', function (done) {
        request.get('/carteiras')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('#cadastro de acoes', function (done) {
        request.post('/carteiras')
        .send({date_buy:'2017-01-01', quantity: 1235, price: 30})
        .expect(302, done);
    });
});
