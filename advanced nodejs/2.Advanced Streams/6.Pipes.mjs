import { createReadStream, createWriteStream } from 'fs'
const readStream = createReadStream("../powder-day.mp4")
const writeStream = createWriteStream("../copy.mp4")

// readStream.pipe(writeStream).on("error", console.error)

const writeFileStream = createWriteStream("./file.txt")
process.stdin.pipe(writeFileStream)