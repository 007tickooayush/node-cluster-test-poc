const cluster = require('node:cluster');
const { availableParallelism } = require('os');

console.log(process.cwd());
const serverDir = process.cwd();

const cpuCount = availableParallelism();

console.log(`Primary pid=${process.pid}`);
cluster.setupPrimary({
  exec: serverDir + '/index.js',
});

for (let i = 0; i < cpuCount; i++) {
  cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid} has terminated.`);
  console.log('Initiating replacement worker.');
  cluster.fork();
});
