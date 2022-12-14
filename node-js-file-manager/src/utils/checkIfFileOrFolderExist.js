import fs from 'fs';
import fsPromises from 'fs/promises';
import { showErrorMessage } from './showErrorMessage.js';

const checkIfFileOrFolderExist = async (path) => {
    try {
        await fsPromises.access(path, fs.constants.R_OK)
        return true
    } catch (e) {
        return false
    }
}

export default checkIfFileOrFolderExist;