import { createHash } from 'crypto';
import { readFile } from 'fs';
import { resolve, dirname } from 'path';

const calculateHash = async () => {
    const pathToHashForFile = resolve(dirname(''), 'src', 'hash', 'files', 'fileToCalculateHashFor.txt');
    const content = await new Promise((resolve, reject) => {
        readFile(pathToHashForFile, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
    const hash = createHash('sha256').update(content).digest('hex');
    console.log(hash);
};

await calculateHash();