const {createServer} = require("http")
const data = require("./data.json")

createServer((req,res) => {
    res.writeHead(200, {"Content-Type" : "text/json"})
    if(req.url.toLowerCase() === "/zia") {
        const person = data.filter(obj => obj.name === "zia")
        res.end(JSON.stringify(person))
    }else {
        res.end(JSON.stringify(data))
    }
}).listen(3000)

console.log("Server is listening on port 3000")