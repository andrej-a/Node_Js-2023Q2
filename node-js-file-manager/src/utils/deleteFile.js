import path from 'path';
import fs from 'fs';
import { showCurrentDirectory } from './showCurrentDirectory.js';
import { showErrorMessage } from './showErrorMessage.js';
import { checkIfPathIsFile } from './checkIfPathIsFile.js';

export const deleteFile = (pathToFile) => {
    if (!checkIfPathIsFile(pathToFile)) {
        showErrorMessage();
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