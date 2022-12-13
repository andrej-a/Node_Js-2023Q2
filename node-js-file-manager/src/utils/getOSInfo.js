import os from 'os';
import { showCurrentDirectory } from './showCurrentDirectory.js';
import { showWarningMessage } from './showWarningMessage.js';

export const getOSInfo = (searchingInformation) => {
    switch (searchingInformation) {
        case '--EOL':
            process.stdout.write(`${JSON.stringify(os.EOL)} \n`);
            showCurrentDirectory();
            break;
        case '--cpus':
            const totalLogicalCores = os.cpus().length;
            process.stdout.write(`Total logical cores: ${totalLogicalCores} \n`);
            os.cpus().forEach((core, i) => {
                process.stdout.write(`Core number ${i + 1} is: ${core.model} \n`);
            })
            showCurrentDirectory();
            break;
        case '--homedir':
            process.stdout.write(`Your home directory is: ${os.homedir()} \n`);
            showCurrentDirectory();
            break;
        case '--username':
            process.stdout.write(`${os.userInfo().username} \n`);
            showCurrentDirectory();
            break;
        case '--architecture':
            process.stdout.write(`${os.arch()}-bit extended system \n`);
            showCurrentDirectory();
            break;    
        default:
            showWarningMessage();
            showCurrentDirectory();
            break;
    }
}