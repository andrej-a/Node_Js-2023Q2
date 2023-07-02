import fs from 'fs';
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import { showWarningMessage } from './showWarningMessage.js';
import checkIfFileOrFolderExist from './checkIfFileOrFolderExist.js';
import constants from "../constants/constants.js";

const { ERROR_MESSAGE } = constants;

export const createFile = async (address) => {
    
    if (await checkIfFileOrFolderExist(address)) {
        showWarningMessage(ERROR_MESSAGE);
        showCurrentDirectory();
        return;
    }

    fs.writeFile(address, '', (err) => {
        if (err) {
            showWarningMessage(ERROR_MESSAGE);
            showCurrentDirectory();
            return;
        }

        process.stdout.write(`\x1b[32mSuccessfully created in ${address} \n\x1b[0m`);
        showCurrentDirectory();
    })
}