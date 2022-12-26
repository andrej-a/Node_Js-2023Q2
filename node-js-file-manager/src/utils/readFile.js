import path from 'path';
import fs from 'fs';
import { showCurrentDirectory } from './showCurrentDirectory.js';
import { showErrorMessage } from './showErrorMessage.js';
import { checkIfPathIsFile } from './checkIfPathIsFile.js';
import { showWarningMessage } from './showWarningMessage.js';
import checkIfFileOrFolderExist from './checkIfFileOrFolderExist.js';

export const readFile = async (pathToFile) => {
    if (!(await checkIfFileOrFolderExist(pathToFile))) {
        showErrorMessage();
        showCurrentDirectory();
        return;
    }
    if (!pathToFile || !checkIfPathIsFile(pathToFile)) {
        showWarningMessage();
        showCurrentDirectory();
        return;
    }

    const stream = fs.createReadStream(pathToFile);

    stream.on('data', (chunk) => {
        process.stdout.write(`${chunk} \n`);
    })

    stream.on('error', (err) => {
        if (err) {
            showErrorMessage();
            showCurrentDirectory();
            return;
        }
    })

    stream.on('end', () => {
        process.stdout.write(`\x1b[32mSuccessfully read: ${pathToFile} \n\x1b[0m`);
        showCurrentDirectory();
    })
}