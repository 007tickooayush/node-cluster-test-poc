// import cluster from 'node:cluster';
// import { availableParallelism } from 'node:os';
// import process from 'node:process';
// import { dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';

const cluster = require('node:cluster');
const { availableParallelism } = require('os');
// const process = require('node:process');
// const { path, dirname } = require('node:path');
// const { fileURLToPath } = require('node:url');

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
