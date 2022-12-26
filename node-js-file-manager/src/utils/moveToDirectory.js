import { resolve } from "path";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import checkIfFileOrFolderExist from './checkIfFileOrFolderExist.js';
import { showErrorMessage } from './showErrorMessage.js';
import { checkIfPathIsDirectory } from "./checkIfPathIsDirectory.js";
import { showWarningMessage } from "./showWarningMessage.js";

export const moveToDirectory = async (pathToDirectory) => {
    if (pathToDirectory && pathToDirectory !== process.cwd() && await checkIfFileOrFolderExist(`${pathToDirectory}`)) {
        if (checkIfPathIsDirectory(pathToDirectory)) {
            process.chdir(resolve(pathToDirectory))
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