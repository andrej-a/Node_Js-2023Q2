import os from 'os';

export const setHomeDirectory = () => {
    process.chdir(os.homedir())
}