const { Readable } = require("stream");

const peaks = [
  "Tallac",
  "Ralston",
  "Rubicon",
  "Twin Peaks",
  "Castle Peaks",
  "Rose",
  "Freel Peak",
];

//Streams can read data in binary mode and object mode. When its in binary mode we can read the data by setting encoding at super()

//Object Mode
class StreamFromArray extends Readable {
  constructor(array) {
    super({ objectMode: true });
    this.array = array;
    this.index = 0;
  }

  _read() {
    if (this.index <= this.array.length) {
      const chunk = {
        data: this.array[this.index],
        index: this.index,
      };
      this.push(chunk);
      this.index++;
    } else {
      this.push(null); //By pushing null means stream is over
    }
  }
}

//Binary Mode
/*class StreamFromArray extends Readable {
  constructor(array) {
    // super();
    super({encoding : "utf-8"});
    this.array = array;
    this.index = 0;
  }

  _read() {
    if(this.index <= this.array.length) {
        const chunk = this.array[this.index];
        this.push(chunk);
        this.index++;
    }else {
        this.push(null) //By pushing null means stream is over
    }
  }
}*/

const peakStream = new StreamFromArray(peaks);
peakStream.on("data", (chunk) => console.log(chunk)); //{data : "Tallac", index : 0} --Object Mode ** "Tallac" -- Binary mode

peakStream.on("end", () => console.log("Done"));
