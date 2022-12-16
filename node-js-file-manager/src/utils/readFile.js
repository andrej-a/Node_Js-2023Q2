import path from 'path';
import fs from 'fs';
import { showCurrentDirectory } from './showCurrentDirectory.js';
import { showErrorMessage } from './showErrorMessage.js';
import { checkIfPathIsFile } from './checkIfPathIsFile.js';

export const readFile = (pathToFile) => {
    if (!pathToFile || !checkIfPathIsFile(pathToFile)) {
        showErrorMessage();
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
        process.stdout.write(`Successfully read: ${pathToFile} \n`);
        showCurrentDirectory();
    })
}