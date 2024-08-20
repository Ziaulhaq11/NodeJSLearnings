import minimist from "minimist";
import Timer from "tiny-timer";

const { time } = minimist(process.argv)
if(!time) {
    throw new Error("--time is requried")
}

if(!parseInt(time)) {
    throw new Error("--time must be a number")
}

console.log(time)

const timer = new Timer()
timer.on("tick", () => console.log("tick"))
timer.on("done", () => console.log("Ticking is done"))

timer.start(time * 1000) //It will run for this much time