import { fork } from 'child_process';
import path, { resolve } from 'path';

const spawnChildProcess = async (args) => {
    const child = fork(resolve(path.dirname(''), 'src', 'cp', 'files', 'script.js'), args.split(' '));

    process.stdin.on('message', function (m) {
        child.stdin.write(m);
    });

    child.on('data', (data) => {
        console.log(data.toString());
    });
};

spawnChildProcess('--first --second --third');