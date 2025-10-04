import { PassThrough, Duplex } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
const readStream = createReadStream("../powder-day.mp4")
const writeStream = createWriteStream("../copy.mp4")

class Throttle extends Duplex {
    constructor(ms) {
        super()
        this.delay = ms;
    }
    //For writing only we're doing the delay, for reading we're not doing anything extra
    _write(chunk, encoding, callback) {
        this.push(chunk)
        setTimeout(callback, this.delay)
    }

    _read() { }

    // This method means when we no more getting data.
    _final() {
        this.push(null)
    }
}

const report = new PassThrough()
const throttle = new Throttle(100) // on every chunk this delay occurs
var total = 0;

report.on("data", chunk => {
    total += chunk.length;
    console.log(total)
})

readStream
    .pipe(throttle)
    .pipe(report)
    .pipe(writeStream)