// Callback -- process.nextTick() tells the nodejs to do this in the next Loop. And it won’t happen synchronously. So, now end comes first then our result shows up.

function hideString(str, done) {
    process.nextTick(() => {
        done(str.replace(/[a-zA-Z]/g, "X"))
    })
}

hideString("Hello World", (hidden) => {
    console.log(hidden)
})
console.log("end")

function delay(seconds, callback) {
    setTimeout(callback, seconds * 1000)
}

console.log("starting delays")
delay(2, () => {
    console.log("Two seconds")
    delay(1, () => {
        console.log("Three seconds")
        delay(1, () => {
            console.log("Four Seconds")
        })
    })
})

// CPS (Continuation Passing Style) -- Its like a callback, but its still synchronous.
/* function hideString(str, done) {
    done(str.replace(/[a-zA-Z]/g, "X"))
}

hideString("Hello World", (hidden) => {
    console.log(hidden)
})
console.log("end") */

//SYNCHRONOUS CODE
/*function hideString(str) {
    return str.replace(/[a-zA-Z]/g, "X")
}

const hidden = hideString("Hello World")
console.log(hidden)
console.log("end")
*/