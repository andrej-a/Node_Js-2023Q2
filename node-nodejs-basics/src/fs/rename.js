import fs from 'fs';
import path, { resolve } from 'path';
import errorGenerator from '../utils/errorGenerator.js';
import checkIfFileOrFolderExist from '../utils/checkIfFileOrFolderExist.js';

export const rename = async () => {
    const from = resolve(path.dirname(''), 'src', 'fs', 'files', 'wrongFilename.txt');
    const to = resolve(path.dirname(''), 'src', 'fs', 'files', 'properFilename.md');
    const errorMessage = 'FS operation failed';

    if (await checkIfFileOrFolderExist(from)) {
        if (await checkIfFileOrFolderExist(to)) {
            errorGenerator(errorMessage)
        }
        else fs.rename(from, to, (err) => {
            if (err) throw err;
        })
    }
    else {
        errorGenerator(errorMessage)
    }
};

await rename();