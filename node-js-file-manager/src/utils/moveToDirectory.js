import { resolve } from "path";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import checkIfFileOrFolderExist from './checkIfFileOrFolderExist.js';
import { showErrorMessage } from './showErrorMessage.js';
import { checkIfPathIsDirectory } from "./checkIfPathIsDirectory.js";
import { showWarningMessage } from "./showWarningMessage.js";

export const moveToDirectory = async (pathToDirectory) => {
    const copyPathToDirectory = pathToDirectory.split('').slice(2).join('');

    if (await checkIfFileOrFolderExist(copyPathToDirectory)) {
        if (checkIfPathIsDirectory(resolve(copyPathToDirectory))) {
            process.chdir(resolve(copyPathToDirectory))
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