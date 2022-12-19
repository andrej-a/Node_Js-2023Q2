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
                fileList.push({name: file.name, type: 'file'});
            } else if (file.isDirectory()) {
                directoryList.push({name: file.name, type: 'directory'});
            }
        }
    })
    .then(() => {
        fileList = fileList.sort();
        directoryList = directoryList.sort();
        const result = [...directoryList, ...fileList];
        if (!result.length) {
            process.stdout.write(`\x1b[32mDirectory is empty. \n\x1b[0m`);
            return;
        }
        console.table(result);
    })
    .then(() => {
        showCurrentDirectory();
    })
}