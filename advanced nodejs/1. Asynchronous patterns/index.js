function hideString(str, done) {
    process.nextTick(() => {
        done(str.replace(/[a-zA-Z]/g, 'X'));
    })
}

hideString("hello world", (hidden) => {
    console.log(hidden)
})

console.log("Done")
