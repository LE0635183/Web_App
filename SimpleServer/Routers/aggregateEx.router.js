const express = require("express");
const { client } = require("../database/database");
const aggregateRouter = express.Router();

const database = client.db("MongoDbEx");
const employeesCollection = database.collection("employees");
const salesCollection = database.collection("sales");
const ordersCollection = database.collection("orders");

// Exercise 1 - get all femal employess
aggregateRouter.get("/1", async (req, res) => {
  const cursor = employeesCollection.find({ gender: "female" });
  const documents = await cursor.toArray();

  res.send(documents);
});

// Exercise 2 - Return the distinct values of $department.name
aggregateRouter.get("/2", async (req, res) => {
  const cursor = employeesCollection.distinct("department.name");
  const documents = await cursor;

  res.send(documents);
});

// Exercise 3 -	Calculate the number of employees in each department
aggregateRouter.get("/3", async (req, res) => {
  const cursor = employeesCollection.aggregate([
    {
      $group: {
        _id: "$department.name",
        count: { $count: {} },
      },
    },
  ]);
  const documents = await cursor.toArray();

  res.send(documents);
});

// Exercise 4 -	Calculate the sum of all male employees per department
aggregateRouter.get("/4", async (req, res) => {
  const cursor = employeesCollection.aggregate([
    {
      $match: {
        gender: "male",
      },
    },
    {
      $group: {
        _id: "$department",
        count: { $sum: 1 },
      },
    },
  ]);

  const documents = await cursor.toArray();
  res.send(documents);
});

// Exercise 5 - Calculate the sum of all salaries of all male employees, per department (needs 2 stages)
aggregateRouter.get("/5", async (req, res) => {
  const cursor = employeesCollection.aggregate([
    {
      $match: {
        gender: "male",
      },
    },
    {
      $group: {
        _id: "$department",
        totalSalaries: { $sum: "$salary" },
      },
    },
  ]);
  const documents = await cursor.toArray();
  res.send(documents);
});

// Exercise 6 - Sort all male employees by firstName
aggregateRouter.get("/6", async (req, res) => {
  const cursor = employeesCollection.aggregate([
    {
      $match: {gender: "male",},
    },
    {
      $project: {firstName:1 , lastName:1}
    },
    {
      $sort: { firstName: 1 }
    }
  ]);

    // alternetavie solution
    const documents2 = await employeesCollection
        .find({gender:"male"}, {firstName:1 , lastName:1})
        .sort({firstName:1})
        .toArray();

  const documents = await cursor.toArray();
  res.send(documents);
});


// Exercise 7 - Calculate Total Sales Amount per Product for the Year 2021
aggregateRouter.get("/7", async (req, res) => {
  const documents = await salesCollection.aggregate([
    {
      $match: {
        year: 2021,
      },
    },
    {
      $group: {
        _id: "$product",
        totalAmount: { $sum: "$amount" },
      },
    },
  ]).toArray();
  res.send(documents);
});

// Exercise 8 -	Calculate the Average Sale Amount per Product Across All Years
aggregateRouter.get("/8", async (req, res) => {
  const documents = await salesCollection.aggregate([
    {
      $group: {
        _id: "$product",
        averageAmount: { $avg: "$amount" },
      },
    },
  ]).toArray();
  res.send(documents);
});

// Exercise 9 -	Find Maximum Sale Amount per Year
aggregateRouter.get("/9", async (req, res) => {
  const documents = await salesCollection.aggregate([
    {
      $group: {
        _id: "$year",
        maxAmount: { $max: "$amount" },
      },
    },
  ]).toArray();
  res.send(documents);
});

// Exercise 10 - Count the Total Number of Products Ordered by Each Customer
aggregateRouter.get("/10", async (req, res) => {
  const documents = await ordersCollection.aggregate([
    {
      $unwind: "$items",
    },
    {
      $group: {
        _id: "$customerName",
        totalProducts: { $sum: 1 },
      },
    },
  ]).toArray();
  res.send(documents);
});

// Exercise 11 - Find Average Price of Items Sold

aggregateRouter.get("/11", async (req, res) => {
    const documents = await ordersCollection.aggregate([
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: null,
          totalProducts: { $avg: "$items.price" },
        },
      },
    ]).toArray();
    res.send(documents);
  });

// Exercise 12 - Orders Summary by Status, sorted

aggregateRouter.get("/12", async (req, res) => {
    const documents = await ordersCollection.aggregate([
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$customerName",
          totalProducts: { $sum: 1 },
        },
      },
    ]).toArray();
    res.send(documents);
  });





module.exports = aggregateRouter;
