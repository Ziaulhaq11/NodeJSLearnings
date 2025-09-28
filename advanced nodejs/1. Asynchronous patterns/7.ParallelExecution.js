var fs = require('fs');
var { promisify } = require("util")
const writeFile = promisify(fs.writeFile)
const unlink = promisify(fs.unlink)
const readdir = promisify(fs.readdir)
var beep = () => process.stdout.write("\x07");

const delay = (seconds) => new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
})

// Promise.all wait for all promises to resolve. Promise.race will wait for first promise to resolve.
Promise.race([
    delay(5),
    delay(2),
    delay(3),
    delay(5)
]).then(() => readdir(__dirname))
    .then(console.log)

// It will wait for all promises to resolve then only "then" will runs. 
// Promise.all([
//     delay(5),
//     delay(2),
//     delay(3),
//     delay(5)
// ]).then(() => readdir(__dirname))
//     .then(console.log)

// Promise.all([
//     writeFile("readme.md", "Hello world"),
//     writeFile("readme.txt", "Hello World"),
//     delay(3), // It adds delay for all promises
//     writeFile("readme.json", '{"hello" : "world"}')
// ]).then(() => readdir(__dirname))
//     .then(console.log)


// Promise.all([
//     unlink("readme.md"),
//     unlink("readme.txt"),
//     delay(3),
//     unlink("readme.json")
// ]).then(() => readdir(__dirname))
//     .then(console.log)