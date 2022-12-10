import { cp } from 'fs';

import path, { resolve } from 'path';

import errorGenerator from '../utils/errorGenerator.js';
import checkIfFileOrFolderExist from '../utils/checkIfFileOrFolderExist.js';

const copy = async () => {
    const from = resolve(path.dirname(''), 'src', 'fs', 'files');
    const to = resolve(path.dirname(''), 'src', 'fs', 'files_copy');
    const errorMessage = 'FS operation failed';
    
    if (await checkIfFileOrFolderExist(from)) {
        if (await checkIfFileOrFolderExist(to)) {
            errorGenerator(errorMessage);
        } else {
            cp(from, to, {recursive: true}, (err) => {
                if (err) throw err
            });
        }
    } else {
        errorGenerator(errorMessage);
    }
};

copy();