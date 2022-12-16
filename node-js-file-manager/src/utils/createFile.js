import fs from 'fs';
import path, { resolve } from "path";
import { showWarningMessage } from "./showWarningMessage.js";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import { fstat } from "fs";
import { showErrorMessage } from './showErrorMessage.js';

export const createFile = (address) => {
    if (!path.extname(`${address}`)) {
        showWarningMessage();
        showCurrentDirectory();
        return;
    }

    fs.writeFile(address, '', (err) => {
        if (err) {
            showErrorMessage();
            showCurrentDirectory();
            return;
        }

        process.stdout.write(`Successfully created in ${address} \n`);
        showCurrentDirectory();
    })
}