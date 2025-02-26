const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function connect() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to db');

  return 'done';
}

module.exports = {
  connect,
  client,
};
 