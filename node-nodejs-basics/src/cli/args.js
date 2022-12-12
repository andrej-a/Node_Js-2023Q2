import { argv } from 'node:process';

export const parseArgs = () => {
    const filtered = argv.filter(arg => !arg.match(/C:/gi));
    for (let i = 0; i < filtered.length; i += 2) {
        console.log(`${filtered[i]} is ${filtered[i + 1]}`);
    }
};

parseArgs();