import request from 'supertest';
import { server } from '../src/index';
import { checkCorrectUUID } from '../src/utils/checkCorrectUUID';

let current_user = {};
let id = '';

afterEach(() => {
    server.close();
});

describe('Testing simple CRUD API', function () {
    describe('GET method', () => {
        it('Should return 200 status code', async () => {
            const responce = await request(server).get('/api/users');
            expect(responce.statusCode).toBe(200);
            
        });
        it('Should return 404 status code', async () => {
            const incorrect_address = '/api/incorrect_address';
            const responce = await request(server).get(incorrect_address);
            expect(responce.statusCode).toBe(404);
            expect(responce.text).toEqual(`<h1>This adress ${incorrect_address} is not exist</h1>`)
        });

        it('Should return empty list of users', async () => {
            const responce = await request(server).get('/api/users');
            expect(responce.statusCode).toBe(200);
            expect(JSON.parse(responce.text)).toHaveLength(0);
        });
    });

    describe('POST method', () => {
        it('Should return 201 status code and create user with correct UUID', async () => {
            const responce = await request(server).post('/api/users').send(JSON.stringify({
                username: "User created 2",
                age: 30,
                hobbies: ["drawing", "skiing"],
            }));
            expect(responce.statusCode).toBe(201);
            expect(checkCorrectUUID(JSON.parse(responce.text).id)).toBe(true);
            current_user = JSON.parse(responce.text);
            id = JSON.parse(responce.text).id;             
        })
        it('Should return 400 status code', async () => {
            const responce = await request(server).post('/api/users').send(JSON.stringify({
                username: "User created 2",
                age: 30
            }));
            expect(responce.statusCode).toBe(400);
            expect(responce.text).toEqual('<h1>Oooops! Incorrect fields!</h1>');
        })
        it('GET method should return array with created user', async () => {
            const responce = await request(server).get('/api/users');
            expect(responce.statusCode).toBe(200);
            expect(current_user).toStrictEqual(JSON.parse(responce.text)[0]);
        });
        it('GET method should return user by ID', async () => {
            const responce = await request(server).get(`/api/users/${id}`);
            expect(responce.statusCode).toBe(200);
            expect(current_user).toStrictEqual(JSON.parse(responce.text)[0]);
        });
    })

    describe('PUT method', () => {
        it('Should update user by ID', async () => {
            const responce = await request(server).put(`/api/users/${id}`).send({
                "age": 30,
                "username": "User (updated)",
                "hobbies": []
            })
            expect(JSON.parse(responce.text).username).toEqual('User (updated)');
        })
    })
});
