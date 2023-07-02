import path from 'path';
import fs from 'fs';
import { showCurrentDirectory } from './showCurrentDirectory.js';
import { showWarningMessage } from './showWarningMessage.js';
import { checkIfPathIsFile } from './checkIfPathIsFile.js';
import checkIfFileOrFolderExist from './checkIfFileOrFolderExist.js';
import constants from "../constants/constants.js";

const {WARNING_MESSAGE, ERROR_MESSAGE} = constants;

export const readFile = async (pathToFile) => {
    if (!(await checkIfFileOrFolderExist(pathToFile))) {
        showWarningMessage(ERROR_MESSAGE);
        showCurrentDirectory();
        return;
    }
    if (!pathToFile || !checkIfPathIsFile(pathToFile)) {
        showWarningMessage(WARNING_MESSAGE);
        showCurrentDirectory();
        return;
    }

    const stream = fs.createReadStream(pathToFile);

    stream.on('data', (chunk) => {
        process.stdout.write(`${chunk} \n`);
    })

    stream.on('error', (err) => {
        if (err) {
            showWarningMessage(ERROR_MESSAGE);
            showCurrentDirectory();
            return;
        }
    })

    stream.on('end', () => {
        process.stdout.write(`\x1b[32mSuccessfully read: ${pathToFile} \n\x1b[0m`);
        showCurrentDirectory();
    })
}