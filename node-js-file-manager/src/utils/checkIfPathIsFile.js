import fs from 'fs';
import { showErrorMessage } from './showErrorMessage.js';

export const checkIfPathIsFile = (path) => {
    try {
        const stat = fs.lstatSync(path);
        return stat.isFile();
    } catch (e) {
        showErrorMessage();
        return false;
    }
}