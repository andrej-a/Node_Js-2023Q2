import os from 'os';
import { showCurrentDirectory } from './showCurrentDirectory.js';
import { showWarningMessage } from './showWarningMessage.js';
import constants from '../constants/constants.js';

const { WARNING_MESSAGE } = constants;

export const getOSInfo = (searchingInformation) => {
    switch (searchingInformation) {
        case '--EOL':
            process.stdout.write(`\x1b[32m${JSON.stringify(os.EOL)} \n\x1b[0m`);
            showCurrentDirectory();
            break;
        case '--cpus':
            const totalLogicalCores = os.cpus().length;
            process.stdout.write(`\x1b[32mTotal logical cores: ${totalLogicalCores} \n\x1b[0m`);
            os.cpus().forEach(({ model, speed }, i) => {
                process.stdout.write(`\x1b[32mCore number ${i + 1} is: ${model}, clock rate (GHz) is ${(speed / 1000).toFixed(2)} \n\x1b[0m`);
            })
            showCurrentDirectory();
            break;
        case '--homedir':
            process.stdout.write(`\x1b[32mYour home directory is: ${os.homedir()} \n\x1b[0m`);
            showCurrentDirectory();
            break;
        case '--username':
            process.stdout.write(`\x1b[32m${os.userInfo().username} \n\x1b[0m`);
            showCurrentDirectory();
            break;
        case '--architecture':
            process.stdout.write(`\x1b[32m${os.arch()}-bit extended system \n\x1b[0m`);
            showCurrentDirectory();
            break;
        default:
            showWarningMessage(WARNING_MESSAGE);
            showCurrentDirectory();
            break;
    }
}