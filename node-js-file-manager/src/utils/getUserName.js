import { argv } from 'process';

export const getUserName = () => {
    const filteredCLIArguments = argv.filter((value) => value.match(/--username/gi));
    const userName = filteredCLIArguments[0].split('=')[1];
    return userName;
}
