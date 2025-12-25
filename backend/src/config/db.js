const mongoose = require("mongoose");

const connectDB = async () => {
    let uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
        console.warn(
            "[db] Missing MONGODB_URI/MONGO_URI; using default mongodb://localhost:27017/my_project"
        );
        uri = "mongodb://localhost:27017/my_project";
    }
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected.");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;