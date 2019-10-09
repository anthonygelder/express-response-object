const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /apps', () => {
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

    it('should sort by app title', () => {
        return supertest(app)
        .get('/apps')
        .query({ sort: 'App' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            let sorted = true;                
            let i = 0;
            // iterate once less than the length of the array
            // because we're comparing 2 items in the array at a time
            while (i < res.body.length - 1) {
            // if the next book is less than the book at i,
            if (res.body[i + 1].title < res.body[i].title) {
                // the books were not sorted correctly
                sorted = false;
                break; // exit the loop
            }
            i++;
            }
            expect(sorted).to.be.true;
        });
    });

    it('should sort by app rating', () => {
        return supertest(app)
        .get('/apps')
        .query({ sort: 'Rating' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            let sorted = true;                
            let i = 0;
            // iterate once less than the length of the array
            // because we're comparing 2 items in the array at a time
            while (i < res.body.length - 1) {
            // if the next book is less than the book at i,
            if (res.body[i + 1].title < res.body[i].title) {
                // the books were not sorted correctly
                sorted = false;
                break; // exit the loop
            }
            i++;
            }
            expect(sorted).to.be.true;
        });
    });

    it('should filter by genre', () => {
        return supertest(app)
        .get('/apps')
        .query({ genres: "Pretend Play"})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            const app = res.body[0].Genres;
            expect(app).to.include('Pretend Play')
        });
    })
});