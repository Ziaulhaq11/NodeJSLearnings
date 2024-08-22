const fs = require("fs");
const readStream = fs.createReadStream("./videoStream/powder-day.mp4");

readStream.on("data", (chunk) => {
  console.log("Size : ", chunk.length);
});

readStream.on("end", () => {
  console.log("Finished");
});

readStream.on("error", (error) => {
  console.log("Error occurred");
  console.log(error);
});

//Stdin etc also a stream.
//This stream is non-flowing mode. When stream is in flowing mode, it automatically pushed the chunk of data into pipeline. But here we've to ask for the data.
process.stdin.on("data", (chunk) => {
    var text = chunk.toString().trim();
    console.log("echo : ", text)
})

//We can make flowing mode stream to non flowing mode like this
//So here we're stopping the ReadStream and it only reads when user type something. When user enter finsih then it will read continuously.
/*readStream.pause()
process.stdin.on("data", (chunk) => {
    if(chunk.toString().trim() === "finish") {
        readStream.resume()
    }
    readStream.read()
})*/