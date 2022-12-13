import fs from 'fs';
import zlib from 'zlib';
import path, { resolve } from 'path';

const compress = async () => {
    const pathToCompressFile = resolve(path.dirname(''), 'src', 'zip', 'files', 'fileToCompress.txt');
    const pathToCompressedFile = resolve(path.dirname(''), 'src', 'zip', 'files', 'archive.gz');
    const gzip = zlib.createGzip();
    const rstream = fs.createReadStream(pathToCompressFile);
    const wstream = fs.createWriteStream(pathToCompressedFile);

    rstream.pipe(gzip).pipe(wstream).on('finish', () => {
        console.log('FINISHED!');
    })
};

await compress();