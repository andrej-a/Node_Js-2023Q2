import path, { resolve } from "path";
import fs from 'fs';
import zlib from 'zlib';
import checkIfFileOrFolderExist from "./checkIfFileOrFolderExist.js";
import { showWarningMessage } from "./showWarningMessage.js";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import { checkIfPathIsFile } from "./checkIfPathIsFile.js";
import constants from "../constants/constants.js";

const { ERROR_MESSAGE, WARNING_MESSAGE } = constants;

export const decompressFile = async ({d_source, d_destination}) => {
    if (!(await checkIfFileOrFolderExist(`${d_source}`)) || !checkIfPathIsFile(d_source)) {
        showWarningMessage(WARNING_MESSAGE);
        showCurrentDirectory();
        return;
    }

    if (d_source === d_destination || checkIfPathIsFile(d_destination) || path.extname(d_source) !== '.br') {
        showWarningMessage(ERROR_MESSAGE);
        showCurrentDirectory();
        return;
    }

    if (!(await checkIfFileOrFolderExist(d_destination))) {
        fs.mkdir(d_destination, (err) => {
            if (err) {
                showWarningMessage(ERROR_MESSAGE);
                showCurrentDirectory();
                return;
            }
        })
    }

    try {
        const readStream = fs.createReadStream(d_source);
        const writeStream = fs.createWriteStream(resolve(d_destination, `${path.basename(d_source, path.extname(d_source))}`));
        const brotli = zlib.createBrotliDecompress();
        const stream = readStream.pipe(brotli).pipe(writeStream);
    
        stream.on('finish', () => {
            process.stdout.write(
                `\x1b[32mSuccessfully decompressed from ${resolve(d_source)} into ${resolve(d_destination, `${path.basename(d_source, path.extname(d_source))}`)} \n\x1b[0m`
                )
            showCurrentDirectory();
        })
    
    } catch (err) {
        showWarningMessage(ERROR_MESSAGE);
        showCurrentDirectory();
    }

}