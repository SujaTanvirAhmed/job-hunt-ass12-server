// ==============================================================
// Deployed to: https://whispering-lowlands-37187.herokuapp.com/
// ==============================================================
const express = require('express');
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;

// Initialize the app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database settings
const connUri =
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.CLUSTER_URL}?retryWrites=true&writeConcern=majority`;

const mongodbClient = new MongoClient(connUri, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongodbClient.db(process.env.DB_NAME);
const usersCollection = database.collection('users');
const productsCollection = database.collection('products');
const albumsCollection = database.collection('albums');

// Connecting mongodb
async function startMongo() {
    try {
        await mongodbClient.connect();
        console.log("Mongodb connection successful!")
    }
    catch {
        console.log("Mongodb connection fails!");
    }
}
startMongo();

app.get("/", (req, res) => {
    res.send(`Job Hunt Ass12 Server is Running ...`);
});

app.get("/products", async (req, res) => {
    try {
        const cursor = await productsCollection.find({});
        if ((await productsCollection.countDocuments()) === 0) {
            res.send("No documents found!");
            return;
        }
        res.json(await cursor.toArray());
    }
    catch {
        res.send("Error getting products!");
    };
});

app.get("/users", async (req, res) => {
    try {
        const cursor = await usersCollection.find({});
        if ((await usersCollection.countDocuments()) === 0) {
            res.send("No documents found!");
            return;
        }
        res.json(await cursor.toArray());
    }
    catch {
        res.send("Error getting users!");
    };
});

app.get("/albums", async (req, res) => {
    try {
        const cursor = await albumsCollection.find({});
        if ((await albumsCollection.countDocuments()) === 0) {
            res.send("No documents found!");
            return;
        }
        res.json(await cursor.toArray());
    }
    catch {
        res.send("Error getting albums!");
    };
});

app.get("/load-albums", async (req, res) => {
    // try {
    //     const result = await albumsCollection.insertMany(albums, { ordered: true });
    //     console.log(result.insertedCount, "docs uploaded");
    //     res.send(`${result.insertedCount} documents inserted!`);
    // }
    // catch {
    //     res.send("error");
    // }
});
// ==================================================
// ==================================================

app.listen(port, () => {
    console.log(`Job Hunt Ass12 Server is Running at http://localhost:${port}`);
});
