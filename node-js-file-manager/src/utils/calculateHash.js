import crypto from 'crypto';
import fs from 'fs';
import { resolve } from 'path';
import { showWarningMessage } from "./showWarningMessage.js";
import { showErrorMessage } from "./showErrorMessage.js";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import checkIfFileOrFolderExist from './checkIfFileOrFolderExist.js';
import { checkIfPathIsFile } from './checkIfPathIsFile.js';

export const calculateHash = async (pathToFile) => {
    if (!pathToFile) {
        showWarningMessage();
        showCurrentDirectory();
        return
    }
    const copyPathToFile = resolve(pathToFile.split('').slice(2).join(''));
    if (await checkIfFileOrFolderExist(copyPathToFile)) {
        if (checkIfPathIsFile(copyPathToFile)) {
            const fileBuffer = fs.readFileSync(copyPathToFile, (err) => {
                if (err) {
                    showErrorMessage();
                    showCurrentDirectory();
                    return
                };
            });
            const hashSum = crypto.createHash('sha256');
            hashSum.update(fileBuffer);
            const hex = hashSum.digest('hex');
            process.stdout.write(`Hash for this file is: ${hex}, \n`);
            showCurrentDirectory();
            return;
        }
        showWarningMessage();
        showCurrentDirectory();
    } else {
        showErrorMessage();
        showCurrentDirectory();
    }
}