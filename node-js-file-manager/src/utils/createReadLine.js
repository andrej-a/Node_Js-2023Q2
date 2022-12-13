import readline from 'readline';
import { getOSInfo } from './getOSInfo.js';

export const createReadLine = (readLineInterface, userName) => {
    const {output} = readLineInterface;
    const rl = readline.createInterface(readLineInterface);

    rl.on('line', (value) => {
        switch (value.trim().split(' ')[0]) {
            case '.exit':
                rl.close()
                break;
            case 'os':
                getOSInfo(value.trim().split(' ')[1])
                break;
        
            default:
                console.log(value.split(' ')[0]);
                break;
        }
    });
    
    process.on('exit', function() {
        output.write(`\n Thank you for using File Manager, ${userName}, goodbye! \n`);
    });
}