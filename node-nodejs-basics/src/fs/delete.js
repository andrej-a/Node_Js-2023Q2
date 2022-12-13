import path, { resolve } from "path";
import { unlink } from "fs";
import checkIfFileOrFolderExist from "../utils/checkIfFileOrFolderExist.js";
import errorGenerator from "../utils/errorGenerator.js";

const remove = async () => {
    const file = resolve(path.dirname(''), 'src', 'fs', 'files', 'fileToRemove.txt');
    const errorMessage = 'FS operation failed';

    if (await checkIfFileOrFolderExist(file)) {
        unlink(file, (err) => {
            if (err) throw err;
        })
    } else {
        errorGenerator(errorMessage);
    }
};

await remove();