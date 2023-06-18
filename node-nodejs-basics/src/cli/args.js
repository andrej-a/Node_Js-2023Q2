import { argv } from 'node:process';

export const parseArgs = () => {
    const filtered = argv.filter(arg => !arg.match(/C:/gi));
    const arrayToPrint = [];
    for (let i = 0; i < filtered.length; i += 2) {
        const transformedInfo = `${filtered[i]} is ${filtered[i + 1]}`.slice(2);
        arrayToPrint.push(transformedInfo);
    }
    console.log(arrayToPrint.join(', '))
};

parseArgs();