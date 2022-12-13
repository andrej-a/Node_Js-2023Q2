
export const showCurrentDirectory = () => {
    process.stdout.write(`You are currently in ${process.cwd()} \n`);
}