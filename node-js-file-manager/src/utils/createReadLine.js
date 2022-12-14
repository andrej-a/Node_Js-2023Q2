import readline from 'readline';
import { getOSInfo } from './getOSInfo.js';
import { getFileAndDirectoryList } from './getFileAndDirectoryList.js';
import { moveToDirectory } from './moveToDirectory.js';
import { showErrorMessage } from './showErrorMessage.js';
import { goUp } from './goUp.js';
import { calculateHash } from './calculateHash.js';

export const createReadLine = (readLineInterface, userName) => {
    const {output} = readLineInterface;
    const rl = readline.createInterface(readLineInterface);

    rl.on('line', (value) => {
        switch (value.trim().split(' ')[0]) {
            case '.exit':
                rl.close()
                break;
            case 'up':
                goUp();
                break;
            case 'cd':
                moveToDirectory(value.trim().split(' ')[1]);
                break;
            case 'ls':
                getFileAndDirectoryList()
                break;
            case 'os':
                getOSInfo(value.trim().split(' ')[1])
                break;
            case 'hash':
                calculateHash(value.trim().split(' ')[1])
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