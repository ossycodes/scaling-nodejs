/**
 * In nodejs a single application instance only uses 1 one processor 
 * because nodejs is single threaded, forking your application into 
 * multiple instances is required to take full advantage of your hardware
 * A cluster is a group of node instances that all work together, a cluster is
 * made up of worker processes (the forked instances of our app) , and the main 
 * process which is the instance that spawns and controls the workers.
 * Let's create a cluster to take advantage of every CPU available to us
 */

const http = require("http");
//let's first check the number of CPU;s on this machine
const numberOfCpus = require("os").cpus().length;
//lets add the cluster module
const cluster = require("cluster");

/**
 * find out if this is the master process
 */
// if (cluster.isMaster) {
//     console.log("this is master process running, process:", process.pid);
//     /**
//      * inside the master process we can fork/clone new worker processes
//      */
//     for (let i = 0; i < numberOfCpus; i++) {
//         cluster.fork();
//     }
// } else {
//     http.createServer((req, res) => {
//         const message = "worker process: " + process.pid;
//         console.log("this is the worker process", message);
//         res.end(message);
//     }).listen(3000);
// }

/**
 * You can see we have 4 processes running, we are actually spreading the request
 * amongst four processes (processors) and taking full advantage of our machine
 */

/**
 * One of the advantage of running multiple processes is that your application
 * never has to go down, it can always be available to your users, this is called
 * "Zero Down Time",
 * Sometimes our application goes down this could due to bugs or high traffic or
 * sometimes we just need to update the code and restart the process.
 * In a cluster when a single instance fails, the traffic will use the remaining
 * worker instances and the main process can detect worker failure and automatically
 * restart them.
 * LET'S TAKE A LOOK AT THIS
 */

if (cluster.isMaster) {
    console.log("this is master process running, process:", process.pid);
    /**
     * inside the master process we can fork/clone new worker processes
     */
    for (let i = 0; i < numberOfCpus; i++) {
        cluster.fork();
    }

    /**
     * listen for falures of any worker process
     */
    cluster.on("exit", (worker) => {
        console.log("process just died, with pid:", process.pid);
        console.log("only this number of clusters are remaining", Object.keys(cluster.workers).length);

        /** to actually make our server zero downtime we need to restart worker process/instances | fork a new worker as soon as they are killed */
        console.log("starting new worker");
        cluster.fork();
    });

} else {
    console.log("started a worker", process.pid);
    http.createServer((req, res) => {
        
        res.end(`process with pid ${process.pid}`);
        
        if (req.url === "/kill") {
            /**
             * manually kill a worker process, so we can emit and listen for the exit event
             */
            process.exit();
        } else {
            const message = "worker process: " + process.pid;
            console.log(message);
        }
    }).listen(3000);
}