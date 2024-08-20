const fs = require("fs")
const http = require("http")
const video = "./powder-day.mp4"

http.createServer((req,res) => {
    res.writeHead(200, { 'Content-Type': 'video/mp4' })
    fs.createReadStream(video).pipe(res).on("error", console.error)
}).listen(3000, () => console.log(`Stream - http://localhost:3000`))