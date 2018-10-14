const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const server = 'localhost:8080';

/*
 * Test Suite for make DB connection
 */
describe('Test Suite', function() {
  before(function(done) {
    mongoose.connect('mongodb://localhost/logistic', function(error) {
      if (error) console.error('Error while connecting:\n%\n', error);
      console.log('connected');
      done(error);
    });
  });
});

/*
 * No route found testcase
 */
describe('GET /', () => {
  it('should return 404 for Non configured Urls', (done) => {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        expect(res).to.have.status(404);
        done(); // <= Call done to signal callback end
      });
  });
});

/*
 * Create order testcase
 */
describe('/POST order', () => {
  it('should return 500 with invalid format', (done) => {
    chai.request(server)
      .post('/order')
      .send({
        origin: [28, "77.111761"],
        destination: ["28.530264", "77.111761"]
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });

  it('should create order with valid request', (done) => {
    chai.request(server)
      .post('/order')
      .send({
        origin: ["28.58484", "77.111761"],
        destination: ["28.530264", "77.111761"]
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
        data = res;
      });
  });

  it('should return response status UNASSIGN for new order', (done) => {
    chai.request(server)
      .post('/order')
      .send({
        origin: ["28.530264", "77.111761"],
        destination: ["28.530264", "77.111761"]
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal('UNASSIGN');
        done();
      });
  });
});

/*
 * Order update testcase
 */
describe('/PUT /order/:id', () => {
  it('should return error for order not found', (done) => {
    chai.request(server)
      .put('/order/5bc07c1c478e1313f08333bb')
      .send({
        status: "taken"
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 500 for bad format', (done) => {
    chai.request(server)
      .get('/orders')
      .end((err, res) => {
        let orderResponse = res;
        chai.request(server)
          .put('/order/' + res.body[0].id)
          .send({
            wrong_parm: "taken" //Wrong format as param not supported
          }).end((err, res) => {
            expect(res).to.have.status(500);
            done();
          })


      });
  });

  it('should return success for updating status to taken', (done) => {
    chai.request(server)
      .get('/orders')
      .end((err, res) => {
        chai.request(server)
          .put('/order/' + res.body[0].id)
          .send({
            status: "taken"
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
  });

  it('should return failure for updating status to taken', (done) => {
    chai.request(server)
      .get('/orders')
      .end((err, res) => {
        let orderResponse = res;
        chai.request(server)
          .put('/order/' + res.body[0].id)
          .send({
            status: "taken"
          }).end((err, res) => {
            expect(res).to.have.status(409);
            chai.request(server)
              .put('/order/' + orderResponse.body[0].id)
              .send({
                status: "UNASSIGN"
              }).end((err, res) => {
                done();
              });
          })
      });
  });
});

/*
 * Order listing testcase
 */
describe('GET /', () => {
  it('should return maximum two orders (limit=2)', (done) => {
    chai.request(server)
      .get('/orders?page=1&limit=2')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});
