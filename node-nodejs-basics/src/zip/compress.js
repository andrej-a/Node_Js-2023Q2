import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { resolve, dirname } from 'path';

const compress = async () => {
    const pathToCompressFile = resolve(dirname(''), 'src', 'zip', 'files', 'fileToCompress.txt');
    const pathToCompressedFile = resolve(dirname(''), 'src', 'zip', 'files', 'archive.gz');
    const gzip = zlib.createGzip();
    const rstream = createReadStream(pathToCompressFile);
    const wstream = createWriteStream(pathToCompressedFile);

    rstream.pipe(gzip).pipe(wstream).on('finish', () => {
        console.log('FINISHED!');
    })
};

await compress();