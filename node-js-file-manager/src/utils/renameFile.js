import fs from 'fs';
import path, { resolve } from 'path';
import checkIfFileOrFolderExist from './checkIfFileOrFolderExist.js';
import { checkIfPathIsFile } from "./checkIfPathIsFile.js";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import { showErrorMessage } from "./showErrorMessage.js";

export const renameFile = async ({r_source, r_destination}) => {
    if (!r_source || !checkIfPathIsFile(r_source) || r_destination === process.cwd()) {
        showErrorMessage();
        showCurrentDirectory();
        return;
    }

    if (await checkIfFileOrFolderExist(r_destination)) {
        process.stdout.write("\x1b[31mOperation failed: this file exists already \n\x1b[0m");
        showCurrentDirectory();
        return;
    }

    if (!path.extname(r_destination)) {
        r_destination = resolve(process.cwd(), `${r_destination}${path.extname(r_source)}`);
    }

    fs.rename(r_source, r_destination, (err) => {
        if (err) {
            showErrorMessage();
            showCurrentDirectory();
            return;
        }

        process.stdout.write(`\x1b[32mSuccessfully renamed from ${r_source} to ${r_destination} \n\x1b[0m`);
        showCurrentDirectory();
    })
}