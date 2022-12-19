import path from 'path';
import fs from 'fs';
import { showCurrentDirectory } from './showCurrentDirectory.js';
import { showErrorMessage } from './showErrorMessage.js';
import { checkIfPathIsFile } from './checkIfPathIsFile.js';
import { showWarningMessage } from './showWarningMessage.js';
import checkIfFileOrFolderExist from './checkIfFileOrFolderExist.js';

export const deleteFile = async (pathToFile) => {
    if (!(await checkIfFileOrFolderExist(pathToFile))) {
        showErrorMessage();
        showCurrentDirectory();
        return;
    }
    if (!checkIfPathIsFile(pathToFile)) {
        showWarningMessage();
        showCurrentDirectory();
        return;
    }

    fs.unlink(pathToFile, (err) => {
        if (err) {
            showErrorMessage();
            showCurrentDirectory();
            return;
        }
        process.stdout.write(`\x1b[32mSuccessfully deleted from ${pathToFile} \n\x1b[0m`);
        showCurrentDirectory();
    })
}