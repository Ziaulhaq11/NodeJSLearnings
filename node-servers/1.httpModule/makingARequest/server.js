const http  = require("http")
http.createServer((req,res) => {
    // res.writeHead(200, {"Content-type" : "text/plain"}) //Writing Headers when success
    // res.end("Hello world")
    res.writeHead(200, {"Content-type" : "text/html"})
    res.end(`
            <div>
            <h1>Hello world</h1>
            <p>Request for method ${req.method} and path is ${req.url}</p>
            </div>
        `)
}).listen(3000) //specifying port

console.log("Server is running on port 3000")
