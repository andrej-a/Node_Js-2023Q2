import { argv } from 'process';
import { showWarningMessage } from './showWarningMessage.js';
import constants from '../constants/constants.js';

const { ERROR_MESSAGE } = constants;

export const getUserName = () => {
    try {
        const filteredCLIArguments = argv.filter((value) => value.match(/--username/gi));
        const userName = filteredCLIArguments.length ? filteredCLIArguments[0].split('=')[1] : false;
        return userName;
    } catch (error) {
        showWarningMessage(ERROR_MESSAGE)
    }
}
