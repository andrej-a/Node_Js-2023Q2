import http from 'http';
import * as UsersInteraction from './interaction';
import TUsers from '../models/models';

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

export { getUsers, getUserByID };
