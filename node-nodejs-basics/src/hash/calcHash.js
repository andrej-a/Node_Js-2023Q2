import crypto from 'crypto';
import fs from 'fs';
import path, { resolve } from 'path';

const calculateHash = async () => {
    const pathToHashForFile = resolve(path.dirname(''), 'src', 'hash', 'files', 'fileToCalculateHashFor.txt')
    const fileBuffer = fs.readFileSync(pathToHashForFile, (err) => {
        if (err) throw err;
    });
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    const hex = hashSum.digest('hex');
    console.log(hex);

};

await calculateHash();