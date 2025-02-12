const express = require("express");
const { add, remove } = require("../queue.service");
const ticketsRouter = express.Router();

ticketsRouter.post("/", function (req, res) {
  const body = req.body;

  if (body.subject && body.description) {
    if (!body.level) {
      body.level = 1; // default level
    }
    add(body);
    res.status(202);
    res.send("Ticket added");
  } else {
    res.status(400);
    res.send("Missing subject or description");
  }
});

ticketsRouter.get("/", function (req, res) {
  const tickets = remove();
  if (tickets) {
    res.status(200);
    res.send(tickets);
  } else {
    res.status(204);
    res.send("No more tickets");
  }
});

ticketsRouter.get("/size", function (req, res) {
    const size = size();
    res.status(200);
    res.send(`Current queue size: ${size}`);
});

module.exports = ticketsRouter;
