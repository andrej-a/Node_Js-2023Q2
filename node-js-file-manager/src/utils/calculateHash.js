import crypto from 'crypto';
import fs from 'fs';
import { showWarningMessage } from "./showWarningMessage.js";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import checkIfFileOrFolderExist from './checkIfFileOrFolderExist.js';
import { checkIfPathIsFile } from './checkIfPathIsFile.js';
import constants from '../constants/constants.js';

const { WARNING_MESSAGE, ERROR_MESSAGE } = constants;
export const calculateHash = async (pathToFile) => {
    if (!pathToFile) {
        showWarningMessage(WARNING_MESSAGE);
        showCurrentDirectory();
        return
    }
    if (await checkIfFileOrFolderExist(pathToFile)) {
        if (checkIfPathIsFile(pathToFile)) {
            const fileBuffer = fs.readFileSync(pathToFile, (err) => {
                if (err) {
                    showWarningMessage(ERROR_MESSAGE);
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
        showWarningMessage(WARNING_MESSAGE);
        showCurrentDirectory();
    } else {
        showWarningMessage(ERROR_MESSAGE);
        showCurrentDirectory();
    }
}