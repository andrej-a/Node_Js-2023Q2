import process from 'node:process';

const parseEnv = () => {
    const prefix = 'RSS_';
    const keys = Object.keys(process.env).filter((key) => key.match(prefix));
    keys.forEach((key, i) => {
        console.log(`${prefix}name${i + 1}=${process.env[key]}`);
    })
};

parseEnv();