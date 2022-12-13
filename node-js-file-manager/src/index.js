import { getUserName } from "./utils/getUserName.js";
import { createReadLine } from "./utils/createReadLine.js";
import path, { resolve } from 'path';
import fs from 'fs';

const fileManagerWorkingProcess = () => {
    const {
        stdin: input,
        stdout: output
    } = process;
    const userName = getUserName();
    
    if (!userName) { //переписать на отдельную функцию
        output.write('Invalid input! You must type your name before working \n');
        return;
    }

    output.write(`Welcome to the File Manager, ${userName}!  \n`);

    createReadLine({input, output}, userName);

}

fileManagerWorkingProcess();