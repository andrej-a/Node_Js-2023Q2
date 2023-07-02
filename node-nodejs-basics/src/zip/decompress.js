import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { resolve, dirname } from 'path';

const decompress = async () => {
    const pathToCompressFile = resolve(dirname(''), 'src', 'zip', 'files', 'fileToCompress.txt');
    const pathToCompressedFile = resolve(dirname(''), 'src', 'zip', 'files', 'archive.gz');
    const gunzip = createGunzip();
    const rstream = createReadStream(pathToCompressedFile);
    const wstream = createWriteStream(pathToCompressFile);

    rstream.pipe(gunzip).pipe(wstream).on('finish', () => {
        console.log('FINISHED!');
    })
};

await decompress();