const {createServer} = require("http")
const {createReadStream} = require("fs")

const sendFile = (res,status,file,type) => {
    res.writeHead(status, {"Content-Type" : type})
    createReadStream(file).pipe(res)
}

createServer((req,res) => {
    console.log(res)
    switch(req.url) {
        case "/":
            return sendFile(res, 200, "./home-page.html", "text/html")
        case "/mountains.jpg":
            return sendFile(res, 200, "./mountains.jpg", "image/jpg")
        case "/styles.css":
            return sendFile(res, 200, "./styles.css", "text/css")
        default:
            return sendFile(res, 404, "./404.html", 'text/html')
    }
}).listen(3000)

console.log("Web Server at 3000")