import fs from 'fs';
import path, { resolve } from 'path';
import checkIfFileOrFolderExist from "./checkIfFileOrFolderExist.js";
import { checkIfPathIsFile } from "./checkIfPathIsFile.js";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import { showErrorMessage } from "./showErrorMessage.js";
import { deleteFile } from './deleteFile.js';

export const copyOrMoveFile = async ({ c_source, c_destination }, action = 'copy') => {
    try {
        if (!c_source || !checkIfPathIsFile(c_source) || c_source === c_destination) {
            showErrorMessage();
            showCurrentDirectory();
            return;
        }

        if (!(await checkIfFileOrFolderExist(c_destination))) {
            fs.mkdir(c_destination, (err) => {
                if (err) {
                    showErrorMessage();
                    showCurrentDirectory();
                    return;
                }
            })
        }
        let fileName = resolve(c_destination, `${path.basename(c_source, path.extname(c_source))}`);
        let fileList = [];
        let index = 0;

        await fs.promises.readdir(c_destination, {
                withFileTypes: true
            })
            .then(async (files) => {
                for await (let file of files) {
                    if (file.isFile()) {
                        fileList.push(file.name);
                    }
                }
            })
            .then(() => {
                if (action === 'copy') {
                    fileList.forEach((file) => {
                        if (file.match(`${path.basename(c_source, path.extname(c_source))}`)) {
                            index += 1;
                        }
                    })
                    fileName = index ? `${fileName} copy(${index})${path.extname(c_source)}` : `${fileName}${path.extname(c_source)}`;
                } else {
                    for (let i = 0; i < fileList.length; i++) {
                        if (fileList[i] === `${path.basename(c_source)}`) {
                            throw new Error();
                        }
                    }
                    fileName = `${fileName}${path.extname(c_source)}`;
                }
            })

        const readStream = fs.createReadStream(c_source);
        const writeStream = fs.createWriteStream(fileName);

        readStream.on('data', (chunk) => {
            writeStream.write(chunk);
        })

        readStream.on('error', (err) => {
            if (err) {
                showErrorMessage();
                showCurrentDirectory();
                return;
            }
        })

        readStream.on('end', () => {
            if (action === 'copy') {
                process.stdout.write(`Successfully copied from ${c_source} to ${c_destination} \n`);
                showCurrentDirectory();
            } else {
                deleteFile(c_source);
                process.stdout.write(`Successfully moved from ${c_source} to ${c_destination} \n`);
            }
        })

    } catch (error) {
        showErrorMessage();
        showCurrentDirectory();
    }
}