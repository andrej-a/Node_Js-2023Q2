import readline from 'readline';


export const createReadLine = (readLineInterface, userName) => {
    const {output} = readLineInterface;
    const rl = readline.createInterface(readLineInterface);

    rl.on('line', (value) => {
        switch (value) {
            case '.exit':
                rl.close()
                break;
        
            default:
                break;
        }
    });
    
    process.on('exit', function() {
        output.write(`\n Thank you for using File Manager, ${userName}, goodbye! \n`);
    });
}