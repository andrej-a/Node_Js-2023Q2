import users from '../users';
import TUsers, { IUser } from '../models/models';
import { v4 as uuidv4 } from 'uuid';

const findAllUsers = (): Promise<TUsers> => {
    return new Promise((resolve, reject) => {
        resolve(users);
    })
}

const findUserById = (id: string): Promise<TUsers> => {
    return new Promise((resolve, reject) => {
        resolve(users.filter((c_user) => c_user.id === id));
    })
}

const createUser = (user: IUser): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        const newUser = {id: uuidv4(), ...user};
        users.push(newUser);
        resolve(newUser)
    })
}

const updateUserByID = async (updatedUser: IUser): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((u) => u.id === updatedUser.id);
        users.splice(index, 1, updatedUser);
        resolve(updatedUser);        
    })
}

export {
    findAllUsers,
    findUserById,
    createUser,
    updateUserByID,
}