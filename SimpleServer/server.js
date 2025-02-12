const express = require("express");
const path = require("path");
const app = express();
const {v4: uuidv4} = require("uuid"); // import
const morgan = require('morgan');
const examplesRouter = require('./Routers/examples.router');
const ticketsRouter = require("./Routers/tickets.router");
const { startCron } = require("./crons.service");



uuidv4(); // Generate a new UUID

// 1 Logger middleware
app.use(morgan('tiny'))
// customed logger
app.use(function (req, res, next) {
  console.log(`Request: ${new Date()} ${req.method} ${req.path} ${JSON.stringify(req.query)}`)
  next();
})
// 2 Body-parser middleware
app.use(express.json()); // body-parser for JSON
// 3 auth middleware
/* app.use(function (req, res, next) {
  if (req.headers.user_id) {
    // this is fine
    next();
  } else {
    // Early exit
    res.status(401);
    res.send("Unauthorized");
  }  
}); */

// 4 logic router middleware

// path.join is used the right way to join the path from the os used
// /static is the path used in the browser to access the public folder
app.use("/static", express.static(path.join(__dirname, "public"))); // ONLY GET

app.use("/", express.static(path.join(__dirname, "dist"))); // ONLY GET

// get this for the server
app.get("/hello", function (req, res) { 
  res.send("Hello World");
});

app.use('/examples', examplesRouter)
app.use("/tickets", ticketsRouter)

// 5 Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  if(err.message){
    res.send({message: err.message})
  }
  else{
    res.status(500);
    res.send({message: "An error occured"})
  }
  //next()
});

// this is the port used for the server
app.listen(3000, () => {
  // connect to a database
  // startCron();
  console.log("Server is running on http://localhost:3000");
});
