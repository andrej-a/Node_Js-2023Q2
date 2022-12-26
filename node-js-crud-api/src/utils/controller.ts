import http from 'http';
import * as UsersInteraction from './interaction';

const getUsers = async (request: http.IncomingMessage, responce: http.ServerResponse<http.IncomingMessage>) => {
    try {
        const users = await UsersInteraction.findAllUsers();
        responce.writeHead(200, { 'Content-Type': 'application/json' });
        responce.end(JSON.stringify(users));
    } catch (error) {
        responce.writeHead(500, { 'Content-Type': 'text/html' });
        responce.end(`<h1>Oooops! Error: ${error}</h1>`);
    }
};

const getUserByID = async (
    request: http.IncomingMessage,
    responce: http.ServerResponse<http.IncomingMessage>,
    id: string
) => {
    if (!id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)) {
        responce.writeHead(400, { 'Content-Type': 'text/html' });
        responce.end(`<h1>Invalid ID</h1>`);
        return;
    }

    try {
        const user = await UsersInteraction.findUserById(id);
        if (!user.length) {
            responce.writeHead(404, { 'Content-Type': 'text/html' });
            responce.end(`<h1>Oooops! This id ${id} is not exist</h1>`);
            return;
        }

        responce.writeHead(200, { 'Content-Type': 'application/json' });
        responce.end(JSON.stringify(user));
    } catch (error) {
        responce.writeHead(500, { 'Content-Type': 'text/html' });
        responce.end(`<h1>Oooops! Error: ${error}</h1>`);
    }
};

const addUser = async (request: http.IncomingMessage, responce: http.ServerResponse<http.IncomingMessage>) => {
    let body = '';

    try {
        request.on('data', (chunk) => {
            body += chunk.toString();
        });

        request.on('end', async () => {
            const newUser = await UsersInteraction.createUSer(JSON.parse(body));
            responce.writeHead(201, { 'Content-Type': 'application/json' });
            responce.end(JSON.stringify(newUser));
        });
    } catch (error) {
        responce.writeHead(500, { 'Content-Type': 'text/html' });
        responce.end(`<h1>Oooops! Error: ${error}</h1>`);
    }
};

const updateUser = (
    request: http.IncomingMessage,
    responce: http.ServerResponse<http.IncomingMessage>,
    id: string
) => {

}

export { getUsers, getUserByID, addUser, updateUser };
