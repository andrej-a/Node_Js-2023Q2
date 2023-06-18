import { Worker } from 'worker_threads';
import { cpus } from 'os';
import path, { resolve } from 'path';

const performCalculations = async () => {
    const source = resolve(path.dirname(''), 'src', 'wt', 'worker.js');
    const cores = cpus();

    const promises = await Promise.allSettled(cores.map((core, index) => {
        return new Promise((res, rej) => {
            const worker = new Worker(source, { workerData: 10 + index });
            worker.on('message', msg => res(msg));
            worker.on('error', err => rej(err));
        })
    }))

    const result = promises.map(({status, value}) => {
        return {
            status: status === 'fulfilled' ? 'resolved' : 'error',
            value : status === 'fulfilled' ? value : null
        }
    })

    console.log(result);
};

await performCalculations();