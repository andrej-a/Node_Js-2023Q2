import fs from 'fs';
import path, { resolve } from 'path';
import { checkIfPathIsFile } from "./checkIfPathIsFile.js";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import { showErrorMessage } from "./showErrorMessage.js";

export const renameFile = ({r_source, r_destination}) => {
    if (!r_source || !checkIfPathIsFile(r_source)) {
        showErrorMessage();
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

        process.stdout.write(`Successfully renamed from ${r_source} to ${r_destination} \n`);
        showCurrentDirectory();
    })
}