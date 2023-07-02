
export const showWarningMessage = (message) => {
    process.stdout.write(`\x1b[31m${message} \n\x1b[0m`);
}