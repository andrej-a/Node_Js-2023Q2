import { getUserName } from "./utils/getUserName.js";
import { createReadLine } from "./utils/createReadLine.js";
import { setHomeDirectory } from "./utils/setHomeDirectory.js";
import { showCurrentDirectory } from './utils/showCurrentDirectory.js';

const fileManagerWorkingProcess = () => {
    const {
        stdin: input,
        stdout: output
    } = process;
    const userName = getUserName();
    
    if (!userName) {
        output.write('\x1b[31mInvalid input! You must type your name before working \n\x1b[0m');
        return;
    }

    output.write(`\x1b[32mWelcome to the File Manager, ${userName}!  \n\x1b[0m`);
    setHomeDirectory();
    showCurrentDirectory();
    createReadLine({input, output}, userName);

}

fileManagerWorkingProcess();