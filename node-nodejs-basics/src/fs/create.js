import { writeFile } from 'fs';
import path, { resolve } from 'path';

import errorGenerator from '../utils/errorGenerator.js';
import checkIfFileOrFolderExist from '../utils/checkIfFileOrFolderExist.js';

const create = async () => {
    const file = resolve(path.dirname(''), 'src', 'fs', 'files', 'fresh.txt');
    const innerText = 'I am fresh and young';
    const errorMessage = 'FS operation failed';
    if (await checkIfFileOrFolderExist(file)) {
        errorGenerator(errorMessage);
    } else {
        writeFile(file, innerText, (err) => {
                if (err) throw err;
            })
    }
};

await create();