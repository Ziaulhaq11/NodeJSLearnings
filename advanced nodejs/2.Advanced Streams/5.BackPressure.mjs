import { createReadStream, createWriteStream } from 'fs'
const readStream = createReadStream("../powder-day.mp4")
const writeStream = createWriteStream("../copy.mp4", {
    highWaterMark: 1678082
})

readStream.on("data", chunk => {
    const result = writeStream.write(chunk) // It returns whether hose is full or not with true or false, false for full
    if (!result) {
        console.log("Back Pressure")
        readStream.pause()
    }
})

readStream.on("error", error => {
    console.log("An Error Occurred", error.message)
})

readStream.on("close", () => {
    writeStream.end()
})

writeStream.on("drain", () => {
    console.log("drained")
    readStream.resume()
})

writeStream.on("close", () => {
    process.stdout.write("file copied\n")
})
