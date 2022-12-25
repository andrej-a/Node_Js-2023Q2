interface IUser {
    id: string;
    username: string;
    age: number;
    hobbies: string[] | [];
}

type TUsers = IUser[];

export default TUsers;