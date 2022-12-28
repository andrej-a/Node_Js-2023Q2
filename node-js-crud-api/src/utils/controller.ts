import http from 'http';
import { IUser } from '../models/models';
import * as UsersInteraction from './interaction';
import { objectValidator } from './objectValidator';

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

const getUserByID = async (responce: http.ServerResponse<http.IncomingMessage>, id: string) => {
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
            if (body.match(/'/g) || !body || !objectValidator(JSON.parse(body))) {
                responce.writeHead(400, { 'Content-Type': 'text/html' });
                responce.end(`<h1>Oooops! Incorrect fields!</h1>`);
                return;
            }

            const newUser = await UsersInteraction.createUser(JSON.parse(body));
            responce.writeHead(201, { 'Content-Type': 'application/json' });
            responce.end(JSON.stringify(newUser));
        });
    } catch (error) {
        responce.writeHead(500, { 'Content-Type': 'text/html' });
        responce.end(`<h1>Oooops! Error: ${error}</h1>`);
    }
};

const updateUser = async (
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
        const currentUserState = await UsersInteraction.findUserById(id);
        if (!currentUserState.length) {
            responce.writeHead(404, { 'Content-Type': 'text/html' });
            responce.end(`<h1>Oooops! This id ${id} is not exist</h1>`);
            return;
        }

        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
        });

        request.on('end', async () => {
            if (body.match(/'/g) || !body) {
                responce.writeHead(400, { 'Content-Type': 'text/html' });
                responce.end(`<h1>Oooops! Incorrect fields!</h1>`);
                return;
            }

            const newUserState: IUser = JSON.parse(body);
            const mergedUserState: IUser = {
                id: currentUserState[0].id,
                username: newUserState.username || currentUserState[0].username,
                age: newUserState.age || currentUserState[0].age,
                hobbies: newUserState.hobbies || currentUserState[0].hobbies,
            };
            const updatedUser = await UsersInteraction.updateUserByID(mergedUserState);
            responce.writeHead(201, { 'Content-Type': 'application/json' });
            responce.end(JSON.stringify(updatedUser));
        });
    } catch (error) {
        responce.writeHead(500, { 'Content-Type': 'text/html' });
        responce.end(`<h1>Oooops! Error: ${error}</h1>`);
    }
};

export const deleteUser = async (
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
        await UsersInteraction.deleteUserByID(id);
        responce.writeHead(204, { 'Content-Type': 'application/json' });
        responce.end(JSON.stringify({message: `User ${id} was removed`}));
} catch (error) {
        responce.writeHead(500, { 'Content-Type': 'text/html' });
        responce.end(`<h1>Oooops! Error: ${error}</h1>`);
    }
};

export { getUsers, getUserByID, addUser, updateUser };
