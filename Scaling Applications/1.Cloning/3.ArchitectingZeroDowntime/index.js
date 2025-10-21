const http = require("http")
const cluster = require("cluster")
const numCpus = require("os").cpus().length

if (cluster.isMaster) {
    console.log("This is the master process", process.pid)
    for (let i = 0; i < numCpus; i++) {
        cluster.fork()
    }
    // Cluster module raise this exit emitter when any worker process dies.
    cluster.on("exit", worker => {
        console.log(`Worker process ${process.pid} had died`)
        console.log("Starting a new worker")
        cluster.fork()
    })
} else {
    console.log(`started a worker at ${process.pid}`)
    http.createServer((req, res) => {
        res.end(`process : ${process.pid}`)

        if (req.url === "/kill") { // NOT RECOMMENDED to add this kill route in PROD
            process.exit()
        } else if (req.url === "/") {
            console.log(`Serving form ${process.pid}`)
        }
    }).listen(3000)
}