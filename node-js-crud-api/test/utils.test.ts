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
        it('Should return 400 status code if object doesn`t contains required fields', async () => {
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
        it('Should update user by ID and return 200 status code', async () => {
            const responce = await request(server).put(`/api/users/${id}`).send({
                "age": 30,
                "username": "User (updated)",
                "hobbies": []
            })
            expect(responce.statusCode).toBe(200);
            expect(JSON.parse(responce.text).username).toEqual('User (updated)');
        })
        it ('Should return answer with status code 400 and corresponding message if userId is invalid', async () => {
            const responce = await request(server).put(`/api/users/incorrect_id`).send({
                "age": 30,
                "username": "User (updated)",
                "hobbies": []
            })
            expect(responce.statusCode).toBe(400);
            expect(responce.text).toEqual('<h1>Invalid ID</h1>');
        })
        it('Should answer with status code 404 and corresponding message if record with id doesn`t exist', async () => {
            const incorrect_id = '0dbd12f3-5c29-45a9-b1c5-3249b983c3a1'
            const responce = await request(server).put(`/api/users/${incorrect_id}`).send({
                "age": 30,
                "username": "User (updated)",
                "hobbies": []
            })
            expect(responce.statusCode).toBe(404);
            expect(responce.text).toEqual(`<h1>Oooops! This id ${incorrect_id} is not exist</h1>`);
        })
    })

    describe('DELETE method', () => {
        it('Should answer with status code 204 if the record is found and deleted', async () => {
            const responce = await request(server).delete(`/api/users/${id}`);
            expect(responce.statusCode).toBe(204);
        })
        it('Should return 404 status code searching by ID', async () => {
            const responce = await request(server).get(`/api/users/${id}`);
            expect(responce.statusCode).toBe(404);
            expect(responce.text).toEqual(`<h1>Oooops! This id ${id} is not exist</h1>`);
        })
    })
});
