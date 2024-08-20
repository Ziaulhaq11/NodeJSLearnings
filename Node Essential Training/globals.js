//globals.js
const collectAnswers = require("./lib/collectAnswers")
const questions = [
    "waht is your name",
    "where do you live",
    "What are you going to do with NodeJs"
]
const answerEvents = collectAnswers(questions, (answers) => { //As we're returning Emitter.
    console.log("Thank you for your answers!");
    console.log(answers)
    process.exit()
})

answerEvents.on("answer", answer => console.log(`The answer is ${answer}`))

/*const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 5 },
  { name: "bananas", type: "fruit", quantity: 0 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 5 },
  { name: "fish", type: "meat", quantity: 22 },
];

function myCallback(quantity) {
  return quantity > 5 ? "ok" : "restock";
}

const inventory2 = [1, 5, 22, 3, 43, 10];

const result2 = Object.groupBy(inventory2, myCallback);
console.log(result2);*/
