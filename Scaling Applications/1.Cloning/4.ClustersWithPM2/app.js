const http = require('http')
const options = [
    "Go for it!",
    "Maybe sleep on it",
    "Do some more research",
    "I don't know",
    "I wouldn't"
]

const server = http.createServer((req, res) => {
    console.log("Server created")
    const randomIndex = Math.floor(Math.random() * options.length)
    const payload = JSON.stringify({
        processID: process.pid,
        advise: options[randomIndex]
    })
    console.log(`Advice from ${process.pid}: ${options[randomIndex]}`)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(payload)
})

server.listen(3000)
console.log(`advise service running on port 3000`)