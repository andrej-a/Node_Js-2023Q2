import fs from 'fs';
import { join } from 'path';
import { showCurrentDirectory } from './showCurrentDirectory.js';
import constants from '../constants/constants.js';

const { FILE_TYPE, DIRECTORY_TYPE, EMPTY_DIRECTORY_MESSAGE } = constants;

export const getFileAndDirectoryList = async () => {
    let fileList = [];
    let directoryList = [];
    await fs.promises.readdir(join(process.cwd()), { withFileTypes: true })
        .then(async (files) => {
            for await (let file of files) {
                if (file.isFile()) {
                    fileList.push({ name: file.name, type: FILE_TYPE });
                } else if (file.isDirectory()) {
                    directoryList.push({ name: file.name, type: DIRECTORY_TYPE });
                }
            }
        })
        .then(() => {
            fileList = fileList.sort();
            directoryList = directoryList.sort();
            const result = [...directoryList, ...fileList];
            if (!result.length) {
                process.stdout.write(`\x1b[32m${EMPTY_DIRECTORY_MESSAGE} \n\x1b[0m`);
                return;
            }
            console.table(result);
        })
        .then(() => {
            showCurrentDirectory();
        })
}