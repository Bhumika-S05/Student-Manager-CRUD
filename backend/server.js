const express = require('express');
const cors = require('cors');
const { connectDB, ObjectId } = require('./crud');

const app = express();
app.use(cors());
app.use(express.json());

let studentsCollection;

// Connect DB
connectDB().then(collection => {
    studentsCollection = collection;
});

// 🔹 CREATE
app.post('/students', async (req, res) => {
    const result = await studentsCollection.insertOne(req.body);
    res.send(result);
});

// 🔹 READ
app.get('/students', async (req, res) => {
    const data = await studentsCollection.find().toArray();
    res.send(data);
});

// 🔹 UPDATE
app.put('/students/:id', async (req, res) => {
    const id = req.params.id;
    const result = await studentsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body }
    );
    res.send(result);
});

// 🔹 DELETE
app.delete('/students/:id', async (req, res) => {
    const id = req.params.id;
    const result = await studentsCollection.deleteOne(
        { _id: new ObjectId(id) }
    );
    res.send(result);
});

// Start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});