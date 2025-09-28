import { Readable } from "stream";

const peaks = [
    "Tallac",
    "Ralston",
    "Rubicon",
    "Twin Peaks",
    "Castle Peak",
    "Rose",
    "Freel Peak"
];

class StreamFromArray extends Readable {
    constructor(array) {
        // super() -- set up Readable or call Readable.
        // super({ encoding: "utf-8" }) -- Encoding type is for String and chunk should be string type.
        super({ objectMode: true }) // Here chunk can be object
        this.array = array;
        this.index = 0
    }

    _read() {
        if (this.index <= this.array.length) {
            // const chunk = this.array[this.index] -- For Binary Mode
            const chunk = {
                data: this.array[this.index],
                index: this.index
            }
            this.push(chunk);
            this.index += 1;
        } else {
            this.push(null) // when we push to null to the stream. It means a signal that Readable stream is over.
        }
    }
}

const peakStream = new StreamFromArray(peaks)

peakStream.on("data", chunk => console.log(chunk))

peakStream.on("end", () => console.log("Done"))