
export const showCurrentDirectory = () => {
    process.stdout.write(`\x1b[34mYou are currently in ${process.cwd()} \n\x1b[0m`);
}