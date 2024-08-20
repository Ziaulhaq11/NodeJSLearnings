import {io} from 'socket.io-client'

const socket = io("http://localhost:3000")

socket.on("connect", () => {
    console.log("Scoket io client is connected")
})

socket.on("message", (message,id) => {
    console.log(`Client Side : ${id} : ${message}`)
})

process.stdin.on("data", data => {//when i get data from terminal
    socket.emit("chat", data.toString().trim())
} ) 