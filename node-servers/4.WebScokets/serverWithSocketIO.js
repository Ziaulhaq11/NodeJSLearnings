import {createServer} from 'http'
import {Server} from 'socket.io'

const server = createServer().listen(3000)
const io = new Server(server)

io.on("connection", (socket) => {
    console.log(`${io.engine.clientsCount} connections`)
    socket.on("chat", message => {
        console.log(`Server side : ${socket.id} : ${message}`)
        io.sockets.emit("message", message, socket.id) //Emits or sends to all
    })
    socket.on("disconnect", () => {
        console.log("disconnect", socket.id)
    })
})

console.log("Socket Server")