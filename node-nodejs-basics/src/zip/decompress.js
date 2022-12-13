import fs from 'fs';
import zlib from 'zlib';
import path, { resolve } from 'path';

const decompress = async () => {
    const pathToCompressFile = resolve(path.dirname(''), 'src', 'zip', 'files', 'fileToCompress.txt');
    const pathToCompressedFile = resolve(path.dirname(''), 'src', 'zip', 'files', 'archive.gz');
    const gunzip = zlib.createGunzip();
    const rstream = fs.createReadStream(pathToCompressedFile);
    const wstream = fs.createWriteStream(pathToCompressFile);

    rstream.pipe(gunzip).pipe(wstream).on('finish', () => {
        console.log('FINISHED!');
    })
};

await decompress();