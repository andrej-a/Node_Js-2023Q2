import fs from 'fs';
import path, { resolve } from "path";
import { showWarningMessage } from "./showWarningMessage.js";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import { showErrorMessage } from './showErrorMessage.js';
import checkIfFileOrFolderExist from './checkIfFileOrFolderExist.js';

export const createFile = async (address) => {
    if (address === process.cwd()) {
        showWarningMessage();
        showCurrentDirectory();
        return;
    }
    if (await checkIfFileOrFolderExist(address)) {
        process.stdout.write(`"\x1b[31mOperation failed: file exists already \n\x1b[0m`);
        showCurrentDirectory();
        return;
    }

    fs.writeFile(address, '', (err) => {
        if (err) {
            showErrorMessage();
            showCurrentDirectory();
            return;
        }

        process.stdout.write(`\x1b[32mSuccessfully created in ${address} \n\x1b[0m`);
        showCurrentDirectory();
    })
}