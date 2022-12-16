import path, { resolve } from "path";
import fs from 'fs';
import zlib from 'zlib';
import checkIfFileOrFolderExist from "./checkIfFileOrFolderExist.js";
import { showWarningMessage } from "./showWarningMessage.js";
import { showCurrentDirectory } from "./showCurrentDirectory.js";
import { showErrorMessage } from "./showErrorMessage.js";
import { checkIfPathIsFile } from "./checkIfPathIsFile.js";

export const decompressFile = async (sourceAndDestination) => {
    const {d_source, d_destination} = sourceAndDestination;
    console.log(d_source, d_destination);
    if (!(await checkIfFileOrFolderExist(`${d_source}`)) || !checkIfPathIsFile(d_source)) {
        showWarningMessage();
        showCurrentDirectory();
        return;
    }

    if (d_source === d_destination || checkIfPathIsFile(d_destination) || path.extname(d_source) !== '.br') {
        showWarningMessage();
        showCurrentDirectory();
        return;
    }

    if (!(await checkIfFileOrFolderExist(d_destination))) {
        fs.mkdir(d_destination, (err) => {
            if (err) {
                showErrorMessage();
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
                `Successfully decompressed from ${resolve(d_source)} into ${resolve(d_destination, `${path.basename(d_source, path.extname(d_source))}`)} \n`
                )
            showCurrentDirectory();
        })
    
    } catch (err) {
        showErrorMessage();
        showCurrentDirectory();
    }

}