import path from 'path';
import fs from 'fs';
import { showCurrentDirectory } from './showCurrentDirectory.js';
import { showErrorMessage } from './showErrorMessage.js';

export const deleteFile = (pathToFile) => {
    if (!path.extname(`${pathToFile}`)) {
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
        process.stdout.write(`Successfully deleted from ${pathToFile} \n`);
        showCurrentDirectory();
    })
}