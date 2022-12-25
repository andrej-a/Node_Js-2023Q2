import http from 'http';
import * as dotenv from 'dotenv';
import { getUsers, getUserByID } from './utils/controller';
dotenv.config();
const PORT = process.env.PORT || 5000;
const server = http.createServer((request, responce) => {
    if (request.url === '/api/users' && request.method === 'GET') {
        getUsers(request, responce);
    } else if (request.url?.match(/\/api\/users\/([0-9]+)/) && request.method === 'GET') {
        const id = request.url.split('/')[3];
        getUserByID(request, responce, id);
    } else {
        responce.writeHead(404, { 'Content-Type': 'text/html' });
        responce.end(`<h1>This adress ${request.url} is not exist</h1>`);
    }
});
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
});
