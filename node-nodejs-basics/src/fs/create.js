import fs, {
    writeFile,
    access
} from 'fs';

const errorGenerator = (message) => {
    throw new Error(message)
}

const create = async () => {
    const path = './src/fs/files/fresh.txt';
    const innerText = 'I am fresh and young';
    const errorMessage = 'FS operation failed';

    access(path, fs.F_OK, (err) => {
        if (err) {
            writeFile(path, innerText, (err) => {
                if (err) throw err;
            })
        } else {
            errorGenerator(errorMessage);
        }
    })
};

await create();