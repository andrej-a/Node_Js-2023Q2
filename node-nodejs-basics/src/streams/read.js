import fs from 'fs';
import path, { resolve } from 'path';
const read = async () => {
    const pathToReadFile = resolve(path.dirname(''), 'src', 'streams', 'files', 'fileToRead.txt');
    const rstream = fs.ReadStream(pathToReadFile, {encoding: 'utf-8'});

    rstream.on('error', (err) => {
        if (err) throw err;
    })

    rstream.on('data', (chunk) => {
        process.stdout.write(chunk);
    })
};

await read();