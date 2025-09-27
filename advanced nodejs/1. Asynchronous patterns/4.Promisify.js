var { promisify } = require("util")
const fs = require('fs')

const writeFile = promisify(fs.writeFile)

writeFile("sample.txt", "This is a sample")
    .then(() => console.log("file successfully created"))
    .catch(err => console.log("Error Creating file"))

const delay = (seconds, callback) => {
    if (seconds > 3) {
        callback(new Error(`${seconds} seconds too long!`))
    } else {
        setTimeout(() => callback(null, `The ${seconds} second delay is over`), seconds * 1000)
    }
}

// const promiseDelay = promisify(delay)
// promiseDelay(5).then(console.log).catch(err => console.log(`Error : ${err.message}`))

// Here this is the callback and if error occurred, we're throwing error in the callback so it returns that message and we can print that. This is the callback which follows error first style. So this can be converted to promises using Promisify.
/* delay(2, (error, message) => {
    if (error) {
        console.log(error.message)
    } else {
        console.log(message)
    }
})*/