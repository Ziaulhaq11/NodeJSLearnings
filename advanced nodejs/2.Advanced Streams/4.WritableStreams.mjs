import { createReadStream, createWriteStream } from 'fs'
const readStream = createReadStream("../powder-day.mp4")
const writeStream = createWriteStream("../copy.mp4")

readStream.on("data", chunk => {
    writeStream.write(chunk)
})

readStream.on("error", error => {
    console.log("An Error Occurred", error.message)
})

readStream.on("close", () => {
    writeStream.end()
})

writeStream.on("close", () => {
    // console.log wrapped around stdout. Means it uses stdout.write
    process.stdout.write("file copied\n")
})
