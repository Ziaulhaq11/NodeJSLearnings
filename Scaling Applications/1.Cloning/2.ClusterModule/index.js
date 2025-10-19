const http = require("http")
const cluster = require("cluster")
const numCpus = require("os").cpus().length

if (cluster.isMaster) {
    console.log("This is the master process", process.pid)
    for (let i = 0; i < numCpus; i++) {
        cluster.fork()
    }
} else {
    http.createServer((req, res) => {
        const message = `worker ${process.pid}...`
        console.log(message)
        res.end(message)
    }).listen(3000)
}

/***
if (cluster.isMaster) {
    console.log("This is the master process", process.pid)
    // So, here we're checking if its master process, then we're creating workers like instances
    for (let i = 0; i < numCpus; i++) {
        cluster.fork()
    }
} else {
    console.log("This is the worker process: ", process.pid)
} */