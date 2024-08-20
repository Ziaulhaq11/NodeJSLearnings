const fs = require("fs");
process.stdout.write("Hello \n \n");

let answerStream;
const questions = [
  "What is your name??",
  "What would you rather be doing?",
  "What is your preferred programming language",
];

const answers = [];
function ask(i = 0) {
  process.stdout.write(`\n\n\n ${questions[i]}`);
  process.stdout.write(` > `);
}
//Here we created a Stream, and add the logic to create and update the file
process.stdin.once("data", (data) => {
  let name = data.toString().trim();
  let fileName = `./${name}.md`;
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }
  answerStream = fs.createWriteStream(fileName);
  answerStream.write(`Questions answer for ${name} \n ======= \n `);
});

//This will make sure program wont stop, and user can enter data
process.stdin.on("data", function (data) {
  //   process.stdout.write(data.toString().trim());
  let answer = data.toString().trim();
  answerStream.write(`Question : ${questions[answers.length]}\n`);

  answerStream.write(`Answer : ${answer} \n`, function () {
    if (answers.length < questions.length) {
      ask(answers.length);
    } else {
      process.exit();
    }
  });
  answers.push(answer);
});
ask(answers.length);

process.on("exit", function () {
   answerStream.close()
  process.stdout.write("\n\n");
  process.stdout.write(`Answer array ${answers}`);
});
