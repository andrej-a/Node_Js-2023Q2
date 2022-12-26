import { IUser } from '../models/models';
interface ISchema {
    username: (value: string) => boolean;
    age: (value: number) => boolean;
    hobbies: (value: string[]) => boolean;
}
export const objectValidator = (object: IUser): boolean => {
    const schema: ISchema = {
        username: (value: string) => /^([A-Z][a-z\-]*)/.test(value),
        age: (value: number) => value ? parseInt(value.toString()) === Number(value) : false,
        hobbies: (value: string[]) => Array.isArray(value),
    };

    const validate = (object: IUser, schema: ISchema) =>
        Object.keys(schema)
            .filter((key) => !schema[key as keyof ISchema](object[key as keyof object]))
            .map((key) => new Error(`${key} is invalid.`));

    const errors = validate(object, schema);

    if (errors.length > 0) {
        for (const { message } of errors) {
            process.stdout.write(`\x1b[31m${message}\n\x1b[0m`);
          }
        return false
    } else {
        return true
    }
};
