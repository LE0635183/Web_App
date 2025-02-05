const express = require("express");
const path = require("path");
const app = express();

const books = app.use(express.json()); // body-parser for JSON

// path.join is used the right way to join the path from the os used
// /static is the path used in the browser to access the public folder
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/", express.static(path.join(__dirname, "dist")));

// get this for the server
app.get("/hello", function (req, res) {
  res.send("Hello World");
});

// path params exemple
app.get("/users/:userId/books/:bookId", function (req, res) {
  console.log(req.params);
  res.send("OK");
});

// query params exemple
app.get("/cars", function (req, res) {
  console.log(req.query);
  res.send("query recieved");
});

// headers params exemple
app.get("/auth", function (req, res) {
  const headers = req.headers;
  if (headers.username === "toto") {
    res.status(200);
    res.send("headers recieved");
  } else {
    res.status(401);
    res.send("headers not recieved");
  }
});

// body params exemple

app.post("/cars", function (req, res) {
  console.log(req.body);
  res.status(201);
  res.send("Car created");
});

// Exercise 1
app.delete("/eraser", function (req, res) {
  const query = req.query;
  console.log("query: ", query);
  if (req.query.confirm === "true") {
    res.status(204);
    res.send("Eraser deleted");
  } else {
    res.status(400);
    res.send("Eraser not deleted");
  }
});

// Exercise 2
app.get("/books/:bookId", function (req, res) {
  const body = req.params;
  console.log("body: ", body);
  if (body.bookId === "135") {
    res.status(200);
    res.send({
      id: 135,
      title: "The Catcher in the Rye",
    });
  } else if (body.bookId === "1762") {
    res.status(200);
    res.send({
      id: 1762,
      title: "the Wizar of Oz",
    });
  } else {
    res.status(404);
    res.send("Book not found");
  }
});

// this is the port used for the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
