// import { Db, MongoClient } from "mongodb";
const { Db, MongoClient } = require('mongodb');

// const MONGODB_URI = "mongodb+srv://aryan570:FaXLyZjVWBV0V4NR@pictures.rlp0vgv.mongodb.net/?retryWrites=true&w=majority";
const MONGODB_URI = "mongodb+srv://anshg0432:0EPMMW1U6Hsto9JQ@cluster0.vcvj4k2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const MONGODB_DB_API = "test";

let cachedClient;
let cachedDb;

async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // check the MongoDB URI
  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }
  // check the MongoDB DB
  if (!MONGODB_DB_API) {
    throw new Error("Define the MONGODB_DB environmental variable");
  }

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI);
  await client.connect();
  let db = client.db(MONGODB_DB_API);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
module.exports = { connectToDatabase };