import path, { resolve } from 'path';
import { readdir } from 'fs';
import errorGenerator from '../utils/errorGenerator.js';
import checkIfFileOrFolderExist from '../utils/checkIfFileOrFolderExist.js';

const list = async () => {
    const errorMessage = 'FS operation failed';
    const directory  = resolve(path.dirname(''), 'src', 'fs', 'files');

    if (await checkIfFileOrFolderExist(directory)) {
        readdir(directory, (err, files) => {
            if (err) throw err;

            files.forEach((file, i) => {
                console.log(`File number ${i + 1} is ${file}`);
            })
        })
    } else {
        errorGenerator(errorMessage);
    }

};

await list();