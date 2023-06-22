import fs from 'fs';
import { showCurrentDirectory } from './showCurrentDirectory.js';
import { showWarningMessage } from './showWarningMessage.js';
import { checkIfPathIsFile } from './checkIfPathIsFile.js';
import checkIfFileOrFolderExist from './checkIfFileOrFolderExist.js';
import constants from "../constants/constants.js";

const { ERROR_MESSAGE, WARNING_MESSAGE } = constants;

export const deleteFile = async (pathToFile) => {
    if (!(await checkIfFileOrFolderExist(pathToFile))) {
        showWarningMessage(WARNING_MESSAGE);
        showCurrentDirectory();
        return;
    }
    if (!checkIfPathIsFile(pathToFile)) {
        showWarningMessage(ERROR_MESSAGE);
        showCurrentDirectory();
        return;
    }

    fs.unlink(pathToFile, (err) => {
        if (err) {
            showWarningMessage(ERROR_MESSAGE);
            showCurrentDirectory();
            return;
        }
        process.stdout.write(`\x1b[32mSuccessfully deleted from ${pathToFile} \n\x1b[0m`);
        showCurrentDirectory();
    })
}