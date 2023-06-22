import fs from 'fs';
import path, { resolve } from 'path';
import checkIfFileOrFolderExist from "./checkIfFileOrFolderExist.js";
import { checkIfPathIsFile } from "./checkIfPathIsFile.js";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import { showWarningMessage } from "./showWarningMessage.js";
import { deleteFile } from './deleteFile.js';
import constants from "../constants/constants.js";

const { ERROR_MESSAGE, WARNING_MESSAGE } = constants;

export const copyOrMoveFile = async ({ c_source, c_destination }, action = 'copy') => {
    try {
        if (!c_source || !checkIfPathIsFile(c_source) || c_source === c_destination) {
            showWarningMessage(WARNING_MESSAGE);
            showCurrentDirectory();
            return;
        }

        if (!(await checkIfFileOrFolderExist(c_destination))) {
            fs.mkdir(c_destination, (err) => {
                if (err) {
                    showWarningMessage(ERROR_MESSAGE);
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
                        if (file === `${path.basename(c_source)}` || file.includes(path.basename(c_source, path.extname(c_source)))) {
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
                showWarningMessage(ERROR_MESSAGE);
                showCurrentDirectory();
                return;
            }
        })

        readStream.on('end', () => {
            if (action === 'copy') {
                process.stdout.write(`\x1b[32mSuccessfully copied from ${c_source} to ${resolve(c_destination, fileName)} \n\x1b[0m`);
                showCurrentDirectory();
            } else {
                deleteFile(c_source);
                process.stdout.write(`\x1b[32mSuccessfully moved from ${c_source} to ${resolve(c_destination, fileName)} \n\x1b[0m`);
            }
        })

    } catch (error) {
        showWarningMessage(ERROR_MESSAGE);
        showCurrentDirectory();
    }
}