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
    if (await checkIfFileOrFolderExist(pathToFile)) {
        if (checkIfPathIsFile(pathToFile)) {
            const fileBuffer = fs.readFileSync(pathToFile, (err) => {
                if (err) {
                    showErrorMessage();
                    showCurrentDirectory();
                    return
                };
            });
            const hashSum = crypto.createHash('sha256');
            hashSum.update(fileBuffer);
            const hex = hashSum.digest('hex');
            process.stdout.write(`\x1b[32mHash for this file is: ${hex} \n\x1b[0m`);
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