import fs from 'fs';
import { showWarningMessage } from './showWarningMessage.js';

export const checkIfPathIsDirectory = (path) => {
    try {
        const stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        showWarningMessage();
        return false;
    }
}