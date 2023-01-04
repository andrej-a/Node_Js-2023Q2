import http from 'http';
import { IUser } from '../models/models';
import { checkCorrectJSON } from './checkCorrectJSON';
import { checkCorrectUUID } from './checkCorrectUUID';
import * as UsersInteraction from './interaction';
import { objectValidator } from './objectValidator';

const getUsers = async (responce: http.ServerResponse<http.IncomingMessage>) => {    
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
    if (!checkCorrectUUID(id)) {
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
            if (!checkCorrectJSON(body)) {
                responce.writeHead(400, { 'Content-Type': 'text/html' });
                responce.end(`<h1>JSON is incorrect</h1>`);
                return;
            }

            if (!objectValidator(JSON.parse(body))) {
                responce.writeHead(400, { 'Content-Type': 'text/html' });
                responce.end(`<h1>Oooops! Incorrect fields!</h1>`);
                return;
            }

            const {username, age, hobbies} = JSON.parse(body);

            const newUser = await UsersInteraction.createUser({username, age, hobbies});
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
    if (!checkCorrectUUID(id)) {
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
            if (!checkCorrectJSON(body)) {
                responce.writeHead(400, { 'Content-Type': 'text/html' });
                responce.end(`<h1>JSON is incorrect</h1>`);
                return;
            }

            const newUserState: IUser = JSON.parse(body);
            const mergedUserState: IUser = {
                id: currentUserState[0].id,
                username: newUserState.username ? newUserState.username.toString() : currentUserState[0].username,
                age: parseInt(newUserState.age.toString()) === Number(newUserState.age) ? newUserState.age : currentUserState[0].age,
                hobbies: Array.isArray(newUserState.hobbies) ? newUserState.hobbies : currentUserState[0].hobbies,
            };
            const updatedUser = await UsersInteraction.updateUserByID(mergedUserState);
            responce.writeHead(200, { 'Content-Type': 'application/json' });
            responce.end(JSON.stringify(updatedUser));
        });
    } catch (error) {
        responce.writeHead(500, { 'Content-Type': 'text/html' });
        responce.end(`<h1>Oooops! Error: ${error}</h1>`);
    }
};

export const deleteUser = async (
    responce: http.ServerResponse<http.IncomingMessage>,
    id: string
) => {
    if (!checkCorrectUUID(id)) {
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
