const https = require("https");
const fs = require("fs");

/*const options = {
    hostname : "en.wikipedia.org", //Root of Endpoint
    port : 443,  //This will run on this port.
    path : "/wiki/Cher",
    method : "GET"
}

const request = https.request(options, res => {
    let responseBody = ""
    res.setEncoding("utf-8")
    res.on("data", chunk => { //This function will get called when we get some data
        console.log("---chunk", chunk.length)
        responseBody+= chunk;
    })
    res.on("end", () => {
        fs.writeFile("cher.html", responseBody, err => {
            if(err) {
                throw err;
            }
            console.log("File Downloaded")
        })
    })
})

request.end()*/

// const url = "https://en.wikipedia.org/wiki/Cher";
// const request = https.get(url, (res) => {
//   let download = fs.createWriteStream("cher2.html"); //Create a file
//   console.log("Response Started");
//   res.pipe(download); //To insert the data
//   res.on("end", () => {
//     console.log("Response finshed");
//   });
// });

// request.end();

const buf1 = Buffer.alloc(5);
const buf4 = Buffer.from([1, 2, 3], 'utf-8');
const buf5 = Buffer.from([257, 257.5, -255, '1'], 'utf-8');
const buf2 = Buffer.from([{name : "zia"}]);
const buf = Buffer.from('hello world');


console.log(buf1)
console.log(buf2.toString())
console.log(buf5.toString("utf-8"))
console.log(buf2.toJSON().data[0])
