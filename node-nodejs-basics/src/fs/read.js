import path, { resolve } from 'path';
import errorGenerator from '../utils/errorGenerator.js';
import checkIfFileOrFolderExist from '../utils/checkIfFileOrFolderExist.js';
import { readFile } from 'fs';

const read = async () => {
    const fileToRead = resolve(path.dirname(''), 'src', 'fs', 'files', 'fileToRead.txt');
    const errorMessage = 'FS operation failed';
    const encoding = 'utf8';
    if (await checkIfFileOrFolderExist(fileToRead)) {
        readFile(fileToRead, encoding, (err, data) => {
            if (err) throw err;

            console.log(data);
        })
    } else {
        errorGenerator(errorMessage);
    }
};

await read();