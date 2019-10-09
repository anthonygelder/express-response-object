const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Express App', () => {
  it('should return an array of apps', () => {
    return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
            const app = res.body[0];
            expect(app).to.include.all.keys(
                'App','Category','Rating','Reviews','Size'
        );
    })
  });

  it('should be 400 if sort is incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'MISTAKE' })
      .expect(400, 'Sort must be one of rating or app');
  });

});