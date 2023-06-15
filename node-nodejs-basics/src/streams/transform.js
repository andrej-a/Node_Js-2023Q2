import { Transform } from 'stream';

const reverseStream = () => {
    return new Transform({
        transform(chunk, encoding, callback) {
            const reverse = `${chunk.toString().split('').reverse().join('')}\n`;
            callback(null, reverse);
        }
    })
}
const transform = async () => {
    const reverse = reverseStream();
    process.stdout.write('Start typing \n');
    process.stdin.pipe(reverse).pipe(process.stdout);
};

await transform();