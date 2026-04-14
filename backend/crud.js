const { MongoClient, ObjectId } = require('mongodb');

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "studentDB";

async function connectDB() {
    await client.connect();
    console.log("MongoDB Connected");
    return client.db(dbName).collection("students");
}

module.exports = { connectDB, ObjectId };