import { getUserName } from "./utils/getUserName.js";
import { createReadLine } from "./utils/createReadLine.js";
import { setHomeDirectory } from "./utils/setHomeDirectory.js";
import { showCurrentDirectory } from './utils/showCurrentDirectory.js';
import constants from "./constants/constants.js";

const { UNCORRECT_USER_NAME } = constants;

const fileManagerWorkingProcess = () => {
    const {
        stdin: input,
        stdout: output
    } = process;
    const userName = getUserName();

    if (!userName) {
        output.write(`\x1b[31m${UNCORRECT_USER_NAME} \n\x1b[0m`);
        return;
    }

    output.write(`\x1b[32mWelcome to the File Manager, ${userName}!  \n\x1b[0m`);
    setHomeDirectory();
    showCurrentDirectory();
    createReadLine({ input, output }, userName);

}

fileManagerWorkingProcess();