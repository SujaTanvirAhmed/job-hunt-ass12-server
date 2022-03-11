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
const reviewsCollection = database.collection('reviews');

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

app.get("/users", async (req, res) => {
    try {
        const email = req.query.email;
        if (email) {
            const user = await usersCollection.findOne({ email });
            const role = user?.role || "user";
            res.send(role);
            console.log(role);
        }
        else {
            console.log("got no mail");
            const cursor = await usersCollection.find({});
            if ((await usersCollection.countDocuments()) === 0) {
                res.send("No documents found!");
                return;
            }
            res.json(await cursor.toArray());
        }
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

app.get("/products", async (req, res) => {
    try {
        const cursor = await productsCollection.find({});
        if ((await productsCollection.countDocuments()) === 0) {
            res.json([]);
            return;
        }
        res.json(await cursor.toArray());
    }
    catch {
        res.send("Error getting products!");
    };
});

app.get("/products/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const theProduct = products.find((product) => product.id === productId);
        if (theProduct) {
            console.log(theProduct);
            res.send(theProduct);
        }
        else {
            console.log("Invalid product id");
            res.send("Invalid product id");
        }
    }
    catch {
        console.log("Error");
        res.send("Error");
    }
});

// app.get("/load-users", async (req, res) => {
//     try {
//         const result = await usersCollection.insertMany(users, { ordered: true });
//         console.log(result.insertedCount, "docs uploaded");
//         res.send(`${result.insertedCount} documents inserted!`);
//     }
//     catch {
//         res.send("error");
//     }
// });

app.get("/reviews", async (req, res) => {
    try {
        const cursor = await reviewsCollection.find({});
        if ((reviewsCollection.countDocuments()) === 0) {
            res.json([]);
            return;
        }
        res.json(await cursor.toArray());
    }
    catch {
        res.send("Error getting reviews!");
    }
});

app.post("/reviews", async (req, res) => {
    try {
        const review = req.body;
        const result = await reviewsCollection.insertOne(review);
        const msg = `Your review inserted with id: ${result.insertedId}`;
        console.log(msg);
        res.send(msg);
    }
    catch {
        res.send("Error uploading your review!");
    }
});

app.listen(port, () => {
    console.log(`Job Hunt Ass12 Server is Running at http://localhost:${port}`);
});

// ==================================================
// ==================================================

// const users = [
//     {
//         name: "Admin",
//         email: "admin@admin.com",
//         role: "admin"
//     },
//     {
//         name: "Test",
//         email: "test@test.com",
//         role: "user"
//     },
//     {
//         name: "Jabornir",
//         email: "jabor.nir@gmail.com",
//         role: "user"
//     },
//     {
//         name: "Jajabortanvir",
//         email: "jajabor.tanvir@gmail.com",
//         role: "user"
//     },
//     {
//         name: "Jabtanv",
//         email: "jab.tanv@gmail.com",
//         role: "user"
//     },
//     {
//         name: "Jajvir",
//         email: "jaj.vir@gmail.com",
//         role: "user"
//     },
//     {
//         name: "Bortan",
//         email: "bor.tan@gmail.com",
//         role: "user"
//     }
// ];

// const products = [
//     {
//         img: "./imgs/tent-01.jpg",
//         title: "TentHome Co-op",
//         desc: "Passage 2 Tent with Footprint",
//         price: "13000.00"
//     },
//     {
//         img: "./imgs/tent-02.jpg",
//         title: "TentHome Co-op",
//         desc: "Kingdom 4 Tent",
//         price: "20000.00"
//     },
//     {
//         img: "./imgs/tent-03.jpg",
//         title: "TentHome Mountainsmith",
//         desc: "Celestial 3 Tent",
//         price: "14300.00"
//     },
//     {
//         img: "./imgs/tent-04.png",
//         title: "TentHome Mountainsmith",
//         desc: "Lichen Peak 2P Tent with Footprint",
//         price: "14500.00"
//     },
//     {
//         img: "./imgs/tent-05.jpg",
//         title: "TentHome ALPS Mountaineering",
//         desc: "Camp Creek 4 Tent",
//         price: "21200.00"
//     },
//     {
//         img: "./imgs/tent-06.jpg",
//         title: "TentHome NEMO Aurora",
//         desc: "2P Tent with Footprint",
//         price: "23800.00"
//     },
//     {
//         img: "./imgs/tent-07.jpg",
//         title: "TentHome Co-op Half Dome SL",
//         desc: "2+ Tent with Footprint",
//         price: "27300.00"
//     },
//     {
//         img: "./imgs/tent-08.jpg",
//         title: "TentHome Co-op Quarter Dome SL",
//         desc: "2 Tent with Footprint",
//         price: "29900.00"
//     },
//     {
//         img: "./imgs/tent-09.jpg",
//         title: "TentHome Co-op Flash Air",
//         desc: "2P Tent",
//         price: "28900.00"
//     },
//     {
//         img: "./imgs/tent-10.jpg",
//         title: "TentHome Big Agnes Tiger Wall UL",
//         desc: "2 Solution-Dyed Tent",
//         price: "32400.00"
//     }
// ];

// const reviews = [
//     {
//         userMail: "jajabor.tanvir@gmail.com",
//         msg: "The product that I bought from you is very good in quality. I suggest others to buy from you.",
//         rating: 4.5
//     },
//     {
//         userMail: "jaj.vir@gmail.com",
//         msg: "The product that I bought from you is very good in quality. I suggest others to buy from you.",
//         rating: 4
//     },
//     {
//         userMail: "bor.tan@gmail.com",
//         msg: "The product that I bought from you is very good in quality. I suggest others to buy from you.",
//         rating: 5
//     },
//     {
//         userMail: "jab.tanv@gmail.com",
//         msg: "The product that I bought from you is very good in quality. I suggest others to buy from you.",
//         rating: 4.8
//     },
//     {
//         userMail: "jabor.nir@gmail.com",
//         msg: "The product that I bought from you is very good in quality. I suggest others to buy from you.",
//         rating: 4.7
//     }
// ];