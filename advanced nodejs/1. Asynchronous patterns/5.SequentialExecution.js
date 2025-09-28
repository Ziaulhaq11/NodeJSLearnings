var fs = require('fs');
var { promisify } = require("util")
const writeFile = promisify(fs.writeFile)
const unlink = promisify(fs.unlink)
const readdir = promisify(fs.readdir)
var beep = () => process.stdout.write("\x07");

const delay = (seconds) => new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
})

// Returning value from Async function
const start = async () => {
    const files = await readdir(__dirname)
    console.log(files)
}

start()

const doStuffSequentiallywithAsync = async () => {
    console.log("Starting")
    await delay(1)
    console.log("Waiting")
    await delay(2)
    try {
        await writeFile("file.txt", "Sample File...")
        beep()
    } catch (err) {
        console.log(err.message)
    }
    console.log("File text created")
    await delay(3)
    beep()
    await unlink("file.txt")
    console.log("File.txt removed")
    // return Promise.resolve() -- Like this now this can be called using .then .catch. Not necessary.
}

const doStuffSequentiallyNew = () => Promise.resolve()
    .then(() => console.log("Starting"))
    .then(() => delay(1))
    .then(() => "waiting")
    .then(console.log) // .then(message => console.log(message))
    .then(() => delay(2))
    .then(() => writeFile("file.txt", "Sample File..."))
    .then(beep)
    .then(() => "File.txt created")
    .then(console.log)
    .then(() => delay(3))
    .then(beep)
    .then(() => unlink("file.txt"))
    .then(() => "File.txt removed")
    .then(console.log)
    .catch(err => console.error(err)) //.catch(console.error)


const doStuffSequentially = () => {
    console.log('starting');
    setTimeout(() => {
        console.log('waiting');
        setTimeout(() => {
            console.log('waiting some more');
            fs.writeFile('file.txt', 'Sample File...', error => {
                if (error) {
                    console.error(error);
                } else {
                    beep();
                    console.log('file.txt created')
                    setTimeout(() => {
                        beep();
                        fs.unlink('file.txt', error => {
                            if (error) {
                                console.error(error);
                            } else {
                                console.log('file.txt removed');
                                console.log('sequential execution complete');
                            }
                        })
                    }, 3000)
                }
            });
        }, 2000)
    }, 1000)
}

// doStuffSequentiallywithAsync();