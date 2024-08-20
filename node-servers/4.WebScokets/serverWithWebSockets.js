import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

let messages = [];

//Whenever we new user connect this will call, and close will call whenever a user is disconnected.
wss.on("connection", (ws, req) => {
    console.log(req)
  ws.on("message", (message) => {
    console.log(message); //Its a buffer
    const messageStr = message.toString();
    messages.push(messageStr);
    if (messageStr === "exit") {
      ws.close();
    } else {
      wss.clients.forEach((client) => client.send(messageStr));
    }
  });
  ws.on("close", () => {
    console.log("User disconnected");
  });
  console.log("New socket connected");
  ws.send("Welcome to Live Chat"); //This will only run at start, when connection established
  if (messages.length) { //IF messages are there then we will send old messages to new users.
    ws.send("Chat Currently in session")
    messages.forEach((message) => {
      ws.send(message.toString())
    });
  }
});

console.log("Chat Server wiating for connection on LocalHost 3000");
