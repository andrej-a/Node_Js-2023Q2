import path, { resolve } from "path";
import fs from 'fs';
import zlib from 'zlib';
import checkIfFileOrFolderExist from "./checkIfFileOrFolderExist.js";
import { showWarningMessage } from "./showWarningMessage.js";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import { checkIfPathIsFile } from "./checkIfPathIsFile.js";
import constants from "../constants/constants.js";

const { ERROR_MESSAGE, WARNING_MESSAGE } = constants;

export const compressFile = async (sourceAndDestination) => {
    const { source, destination } = sourceAndDestination;

    if (!(await checkIfFileOrFolderExist(`${source}`)) || !checkIfPathIsFile(source)) {
        showWarningMessage(ERROR_MESSAGE);
        showCurrentDirectory();
        return;
    }

    if (source === destination || path.extname(destination)) {
        showWarningMessage(WARNING_MESSAGE);
        showCurrentDirectory();
        return;
    }

    if (!(await checkIfFileOrFolderExist(destination))) {
        fs.mkdir(destination, (err) => {
            if (err) {
                showWarningMessage(ERROR_MESSAGE);
                showCurrentDirectory();
                return;
            }
        })
    }

    try {
        const readStream = fs.createReadStream(source);
        const writeStream = fs.createWriteStream(resolve(destination, `${path.basename(source)}.br`));
        const brotli = zlib.createBrotliCompress();
        const stream = readStream.pipe(brotli).pipe(writeStream);

        stream.on('finish', () => {
            process.stdout.write(
                `\x1b[32mSuccessfully compressed from ${resolve(source)} into ${resolve(destination, `${path.basename(source)}.br`)} \n\x1b[0m`
            )
            showCurrentDirectory();
        })

    } catch (err) {
        showWarningMessage(ERROR_MESSAGE);
        showCurrentDirectory();
    }

}