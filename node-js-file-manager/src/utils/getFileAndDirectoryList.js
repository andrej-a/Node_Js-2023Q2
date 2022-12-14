import fs from 'fs';
import { join } from 'path';
import { showCurrentDirectory } from './showCurrentDirectory.js';

export const getFileAndDirectoryList = async () => {
    let fileList = [];
    let directoryList = [];
    await fs.promises.readdir(join(process.cwd()), {withFileTypes: true})
    .then(async (files) => {
        for await (let file of files) {
            if (file.isFile()) {
                fileList.push(`${file.name} is file`);
                fileList = fileList.sort((a, b) => a > b ? 1 : -1);
            } else if (file.isDirectory()) {
                directoryList.push(`${file.name} is directory`);
                directoryList = directoryList.sort((a, b) => a > b ? 1 : -1);
            }
        }
    })
    .then(() => {
        const result = [...directoryList, ...fileList];
        if (!result.length) {
            process.stdout.write(`Directory is empty. \n`);
            return;
        }
        result.forEach((value, i) => {
            process.stdout.write(`Number ${i}: ${value} \n`);
        })
    })
    .then(() => {
        showCurrentDirectory();
    })
}