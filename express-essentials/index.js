import express from 'express'
import data from './data/mock.json' with { type: 'json' };

const app = express()
const PORT = 3001;

//Using the public folder at the root of the project
app.use(express.static("public"))

//Using the images folder at the Route Images
app.use("/images", express.static("images"))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/test", (req, res) => {
    // res.json(data)
    throw new Error("Error Occurred")
})

//Using express.json and express.urlencoded
app.post("/item", (req,res) => {
    const body = req.body;
    res.send(body)
})

//GET with next()
app.get("/next", (req, res, next) => {
    console.log("Response will be sent by next function")
    next()
}, (req, res) => {
    res.send("I just setup the route with a second callback")
})

//Download method
app.get("/download", (req, res) => {
    res.download("images/img2.png")
})

//Redirect
app.get("/redirect", (req, res) => {
    res.redirect("https://www.google.com")
})

//Route chaining
app.route("/class")
.get((req,res) => {
    res.send("Its a GET Route")
}).post((req,res) => {
    res.send("Its a POST Route")
}).put((req,res) => {
    res.send("Its a PUT Route")
})

app.get("/class/:id", (req,res) => {
    //Middleware : Accessing the route parameters
    const studentId = Number(req.params.id);
    const student = data.filter(obj => obj.id === studentId)
    //Everything above the line is middleware
    res.send(student)
})

app.post("/create", (req, res) => {
    res.send("This is a POST request at /create ")
})
app.put("/edit", (req, res) => {
    res.send("This is a PUT request at /edit ")
})
app.delete("/delete", (req, res) => {
    res.send("This is a DELETE request at /delete ")
})

app.use((err, req,res, next) => {
    console.error(err.stack);
    res.status(500).send("Something Went Wrong!!")
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    // console.log(data)
})

