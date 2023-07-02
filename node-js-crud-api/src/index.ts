import http from 'http';
import * as dotenv from 'dotenv';
import {
    getUsers,
    getUserByID,
    addUser,
    updateUser,
    deleteUser,
} from './utils/controller';

function setCorsHeaders(responce: http.ServerResponse<http.IncomingMessage>) {
    responce.setHeader('Access-Control-Allow-Origin', '*');
    responce.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE',
    );
    responce.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

dotenv.config();
const PORT = process.env.PORT || 5000;
export const server = http.createServer((request, responce) => {
    setCorsHeaders(responce)
    if (request.method === 'OPTIONS') {
        responce.statusCode = 200;
        responce.end();
        return;
    }
    
    if (request.url === '/api/users' && request.method === 'GET') {
        getUsers(responce);
    } else if (
        request.url?.match(/\/api\/users\/([0-9 A-Z]+)/i) &&
        request.method === 'GET'
    ) {
        const id = request.url.split('/')[3];
        getUserByID(responce, id);
    } else if (request.url === '/api/users' && request.method === 'POST') {
        addUser(request, responce);
    } else if (
        request.url?.match(/\/api\/users\/([0-9 A-Z]+)/i) &&
        request.method === 'PUT'
    ) {
        const id = request.url.split('/')[3];
        updateUser(request, responce, id);
    } else if (
        request.url?.match(/\/api\/users\/([0-9 A-Z]+)/i) &&
        request.method === 'DELETE'
    ) {
        const id = request.url.split('/')[3];
        deleteUser(responce, id);
    } else {
        responce.writeHead(404, { 'Content-Type': 'text/html' });
        responce.end(`<h1>This adress ${request.url} is not exist</h1>`);
    }
});
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
});
