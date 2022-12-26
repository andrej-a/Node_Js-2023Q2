import fs from 'fs';
import { showErrorMessage } from './showErrorMessage.js';

export const checkIfPathIsDirectory = (path) => {
    try {
        const stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        showErrorMessage();
        return false;
    }
}