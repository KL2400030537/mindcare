import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json());

// ------------ DATABASE CONNECTION ------------
const url = "mongodb+srv://saigamer224_db_user:BGmongodb@cluster0fedf.dnpbiva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0fedf";
const dbName = "mental_health";
const client = new MongoClient(url);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    }
}

const PORT = 5000;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});


// ------------ ROUTES ------------

// Test route
app.get("/", (req, res) => {
    res.status(200).json("Hello World from Express JS");
});


// ------------ USER SIGNUP ------------
app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        const existing = await db.collection("users").findOne({ email });
        if (existing) return res.status(400).json("Email ID already exists");

        const newUser = {
            firstName,
            lastName,
            email: email.trim(),
            phone,
            password: password.trim(),
            userId: new ObjectId().toString(),
        };

        await db.collection("users").insertOne(newUser);

        res.status(201).json("Registered Successfully");
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json("Internal Server Error");
    }
});


// ------------ USER LOGIN ------------
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email.trim();
        const password = req.body.password.trim();

        const user = await db.collection("users").findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json("Invalid Credentials!");
        }

        const fullName = `${user.firstName} ${user.lastName}`;

        res.status(200).json({
            redirect: "/dashboard",
            name: fullName,
            userId: user.userId
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json("Internal Server Error");
    }
});


// ------------ GET ALL USERS (ADMIN USE) ------------
app.get("/api/users", async (req, res) => {
    try {
        const users = await db.collection("users")
            .find({}, { projection: { password: 0 } }) // Hide passwords
            .toArray();

        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json("Internal Server Error");
    }
});


// ------------ GET ALL MOODS OF A USER ------------
app.get("/api/moods/:userId", async (req, res) => {
    try {
        const moods = await db.collection("moods")
            .find({ userId: req.params.userId })
            .sort({ date: 1 })
            .toArray();

        res.status(200).json(moods);
    } catch (err) {
        console.error("Error fetching moods:", err);
        res.status(500).json("Internal Server Error");
    }
});


// ------------ ADD MOOD ENTRY ------------
app.post("/api/moods", async (req, res) => {
    try {
        const { userId, mood, note } = req.body;

        if (!userId || !mood) {
            return res.status(400).json("userId and mood are required");
        }

        const newMood = {
            userId,
            mood,
            note: note || "",
            date: new Date()
        };

        await db.collection("moods").insertOne(newMood);

        res.status(201).json(newMood);
    } catch (err) {
        console.error("Error saving mood:", err);
        res.status(500).json("Internal Server Error");
    }
});
