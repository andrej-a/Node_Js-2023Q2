import { resolve } from "path";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import checkIfFileOrFolderExist from './checkIfFileOrFolderExist.js';
import { showWarningMessage } from './showWarningMessage.js';
import { checkIfPathIsDirectory } from "./checkIfPathIsDirectory.js";
import constants from "../constants/constants.js";

const {WARNING_MESSAGE, ERROR_MESSAGE} = constants;

export const moveToDirectory = async (pathToDirectory) => {
    if (pathToDirectory && pathToDirectory !== process.cwd() && await checkIfFileOrFolderExist(`${pathToDirectory}`)) {
        if (checkIfPathIsDirectory(pathToDirectory)) {
            process.chdir(resolve(pathToDirectory))
            showCurrentDirectory();
            return;    
        }
        showWarningMessage(WARNING_MESSAGE);
        showCurrentDirectory();
    } else {
        showWarningMessage(WARNING_MESSAGE);
        showCurrentDirectory(ERROR_MESSAGE);
    }

 }