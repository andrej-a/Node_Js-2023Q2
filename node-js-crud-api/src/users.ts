import TUsers from './models/models';
import { v4 as uuidv4 } from 'uuid';

const users: TUsers = [ 
    {
        id: uuidv4(),
        username: 'User One',
        age: 27,
        hobbies: ['travelling', 'reading', 'listening to music']
    },
    {
        id: uuidv4(),
        username: 'User Two',
        age: 22,
        hobbies: ['photo', 'cookong']
    },
    {
        id: uuidv4(),
        username: 'User Three',
        age: 19,
        hobbies: []
    },

];

export default users;
