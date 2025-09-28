import fs from 'fs'

const readStream = fs.createReadStream("../powder-day.mp4")

readStream.on("data", chunk => {
    // console.log("reading little chunk\n", chunk)
    console.log("size : ", chunk.length)
})

readStream.on("end", () => {
    console.log("Read stream finished")
})

readStream.on("error", error => {
    console.log("An Error has occurred.")
    console.error(error)
})

/* process.stdin.on("data", chunk => {
    // Chunk is in binary, if its not UTF8 then we can convert like this.
    const text = chunk.toString().trim()
    console.log("echo : ", text)
})*/
readStream.pause() // By pausing this, it becomes non flowing mode, as it pauses the readstream and wait for user input, when user enters something then it read one chunk. When user enters finish, then it resume back to flowing mode
process.stdin.on("data", chunk => {
    if (chunk.toString().trim() === "finish") {
        readStream.resume()
    }
    readStream.read()
})
