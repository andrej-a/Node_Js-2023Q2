import http from 'http';
import * as dotenv from 'dotenv';
import { getUsers, getUserByID, addUser, updateUser, deleteUser } from './utils/controller';

dotenv.config();
const PORT = process.env.PORT || 5000;
const server = http.createServer((request, responce) => {
    if (request.url === '/api/users' && request.method === 'GET') {
        getUsers(responce);
    } else if (request.url?.match(/\/api\/users\/([0-9 A-Z]+)/i) && request.method === 'GET') {
        const id = request.url.split('/')[3];
        getUserByID(responce, id);
    } else if (request.url === '/api/users' && request.method === 'POST') {
        addUser(request, responce)
    } else if(request.url?.match(/\/api\/users\/([0-9 A-Z]+)/i) && request.method === 'PUT') {
        const id = request.url.split('/')[3];
        updateUser(request, responce, id);
    } else if (request.url?.match(/\/api\/users\/([0-9 A-Z]+)/i) && request.method === 'DELETE') {
        const id = request.url.split('/')[3];
        deleteUser(responce, id)
    } else {
        responce.writeHead(404, { 'Content-Type': 'text/html' });
        responce.end(`<h1>This adress ${request.url} is not exist</h1>`);
    }
});
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
});
