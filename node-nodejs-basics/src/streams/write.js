import readline from 'readline';
import path, { resolve } from 'path';
import fs from 'fs';
const write = async () => {
    const pathToWriteFile = resolve(path.dirname(''), 'src', 'streams', 'files', 'fileToWrite.txt');
    const {
        stdin: input,
        stdout: output
    } = process;    
    const rl = readline.createInterface({ input, output });
    const outputStream = fs.createWriteStream(pathToWriteFile);

    output.write('Start typing \n');

    rl.on('line', (value) => {
        let string = value.toString();
        outputStream.write(`${string}\n`);
    });
    
    process.on('exit', function() {
        output.write('\n Ok, it`s closed! \n');
    });
    
};

await write();