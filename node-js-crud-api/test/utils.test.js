const request = require('supertest');
const server = require('../src/index');


describe('Testing simple CRUD API', function () {

    describe('GET method', () => {
        it('Should return list of users and 200 status code', async (done) => {
            const responce = await request(server).get('/api/users')
            expect(responce.statusCode).toBe(200)
        });
    })

});