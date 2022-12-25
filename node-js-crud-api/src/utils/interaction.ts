import users from '../users';
import TUsers from '../models/models';

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

export {
    findAllUsers,
    findUserById,
}