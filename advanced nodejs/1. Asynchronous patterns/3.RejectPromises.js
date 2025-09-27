// If we throw error we've to handle it properly
const delayWithFunc = seconds => new Promise((resolve, reject) => {
    // throw new Error("Error Occurred")
    // We don't have to rely only on Errors. We can actually use reject for throwing errors like this
    setTimeout(() => {
        resolve("Long delay has ended")
    }, seconds * 1000)
    if (seconds > 3) {
        reject(new Error(`${seconds} is too long`))
    }
})

delayWithFunc(10)
    .then(res => console.log(res))
    .catch(err => console.log(err.message))