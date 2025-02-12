const express = require('express');
const examplesRouter = express.Router();


module.exports = examplesRouter;


// path params exemple
examplesRouter.get("/users/:userId/books/:bookId", function (req, res) {
    console.log(req.params);
    res.send("OK");
  });
  
  // query params exemple
  examplesRouter.get("/cars", function (req, res) {
    console.log(req.query);
    res.send("query recieved");
  });
  
  // headers params exemple
  examplesRouter.get("/auth", function (req, res) {
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
  
  examplesRouter.post("/cars", function (req, res) {
    console.log(req.body);
    res.status(201);
    res.send("Car created");
  });
  
  // Exercise 1
  examplesRouter.delete("/eraser", function (req, res) {
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
  examplesRouter.get("/books/:bookId", function (req, res) {
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
  
  // Exercise 3
  examplesRouter.post("/books", function (req, res) {
    const body = req.body;
    console.log("body: ", body);
    if (body.title && body.description) {
      res.status(201);
      res.send({
        id: uuidv4(),
        title: body.title,
        description: body.description,
      });
    } else {
      throw new Error("Missing description or title");
      //res.status(400);
      //res.send("Missing description or title");
    }
  });