// Now this message will be there in then function to console.
const delayWithFunc = seconds => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Long delay has ended")
    }, seconds * 1000)
})

console.log("starting delays")
// We can chain these then methods
delayWithFunc(1)
    .then(msg => console.log(msg))
    .then(() => 23)
    .then(number => console.log("This is the number ", number))


/*const delay = (seconds) => new Promise((resolve, reject) => {
    setTimeout(resolve, seconds * 1000)
})
console.log("starting delays")
delay(1).then(res => console.log("Delay has ended"))
console.log("End first tick")*/