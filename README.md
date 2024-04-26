## NODE CLUSTERING `(node:cluster)` POC

Clustering in Node allows you to ***create multiple instances*** of your Node.js application, called worker processes, to take advantage of multi-core systems, distributing the workload across multiple threads,and improves the ***performance and scalability*** of your application. In the provided repository the specified proof of concept is tested.

In Node.js, the cluster module provides a built-in way to implement clustering. It allows you to create a cluster of worker processes that share the same server port and handle incoming requests in a balanced manner.

Here's a brief overview of how clustering works in Node.js:

When you start your Node.js application, the master process is created. This process is responsible for managing the worker processes.

The master process uses the cluster.fork() method to create multiple worker processes. Each worker process runs the same application code.

The master process listens for incoming network connections and distributes them among the worker processes using a round-robin algorithm. This ensures that each worker process gets an equal share of the incoming requests.

Each worker process is independent and can handle requests concurrently. They can also communicate with each other through inter-process communication (IPC) channels provided by the cluster module.

If a worker process crashes or terminates unexpectedly, the master process automatically creates a new worker process to replace it. This ensures that your application remains available even if individual worker processes fail.

Clustering is particularly useful for applications that have high traffic or perform computationally intensive tasks. By utilizing multiple cores, you can effectively utilize the available resources and improve the overall performance and responsiveness of your Node.js application.

To implement clustering in your Node.js application, you can use the cluster module provided by Node.js. It provides a simple and straightforward API to create and manage worker processes.

## PRE REQUISITES:

```bash
git clone https://github.com/007tickooayush/node-cluster-test-poc.git
```
```bash
npm install
```



## RUN THE CLUSTER:
```bash
npm run cluster
```
OR SINGLE NODE:
```bash
npm run dev
```

## Testing commands:

- For testing the Mathametical operations throughput statistics:
```bash 
npm run test-slow
```

- For File I/O operations throughput statistics:
```bash
npm run test-fs
```