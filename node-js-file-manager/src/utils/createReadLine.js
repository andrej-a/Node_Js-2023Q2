import readline from 'readline';
import { getOSInfo } from './getOSInfo.js';
import { getFileAndDirectoryList } from './getFileAndDirectoryList.js';
import { moveToDirectory } from './moveToDirectory.js';
import { showErrorMessage } from './showErrorMessage.js';
import { goUp } from './goUp.js';
import { calculateHash } from './calculateHash.js';
import { compressFile } from './compressFile.js';
import { decompressFile } from './decompress.js';
import { divideCommandLine } from './divideCommandLine.js';
import { checkPath } from './checkPath.js';
import { createFile } from './createFile.js';
import { deleteFile } from './deleteFile.js';
import { readFile } from './readFile.js';
import { renameFile } from './renameFile.js';

export const createReadLine = (readLineInterface, userName) => {
    const {output} = readLineInterface;
    const rl = readline.createInterface(readLineInterface);

    rl.on('line', (value) => {
        switch (divideCommandLine(value)[0]) {
            case '.exit':
                rl.close()
                break;
            case 'up':
                goUp();
                break;
            case 'cd':
                moveToDirectory(checkPath(process.cwd(), divideCommandLine(value)[1])[0]);
                break;
            case 'ls':
                getFileAndDirectoryList()
                break;
            case 'cat':
                readFile(checkPath(process.cwd(), divideCommandLine(value)[1])[0])
                break;
            case 'add':
                createFile(checkPath(process.cwd(), divideCommandLine(value)[1])[1])
                break;
            case 'rn':
                const r_source = checkPath(process.cwd(), divideCommandLine(value)[1])[0];
                const r_destination = checkPath(process.cwd(), divideCommandLine(value)[1])[1]; 
                renameFile({
                    r_source,
                    r_destination
                })
                break;
            case 'rm':
                deleteFile(checkPath(process.cwd(), divideCommandLine(value)[1])[0])
                break;    
            case 'os':
                getOSInfo(value.trim().split(' ')[1])
                break;
            case 'hash':
                calculateHash(checkPath(process.cwd(), divideCommandLine(value)[1])[0])
                break;
            case 'compress':
                const source = checkPath(process.cwd(), divideCommandLine(value)[1])[0];
                const destination = checkPath(process.cwd(), divideCommandLine(value)[1])[1]; 
                compressFile({
                    source,
                    destination,
                })
                break;
            case 'decompress':
                const d_source = checkPath(process.cwd(), divideCommandLine(value)[1])[0];
                const d_destination = checkPath(process.cwd(), divideCommandLine(value)[1])[1]; 
                decompressFile({
                    d_source,
                    d_destination,
                })
                break;    
            default:
                showErrorMessage();
                break;
        }
    });
    
    process.on('exit', function() {
        output.write(`\n Thank you for using File Manager, ${userName}, goodbye! \n`);
    });
}