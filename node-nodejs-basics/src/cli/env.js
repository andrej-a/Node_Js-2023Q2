import process from 'node:process';

const parseEnv = () => {
    const prefix = 'RSS_';
    let stringToConsole = '';
    const keys = Object.keys(process.env).filter((key) => key.match(prefix));
    keys.forEach((key, i) => {
        stringToConsole += i === keys.length - 1 ? `${key}=${process.env[key]}` : `${key}$=${process.env[key]}; `;
    })
    console.log(stringToConsole);
};

parseEnv();