import fs from 'fs';
import { showWarningMessage } from './showWarningMessage.js';

export const checkIfPathIsFile = (path) => {
    try {
        const stat = fs.lstatSync(path);
        return stat.isFile();
    } catch (e) {
        return false;
    }
}