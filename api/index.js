const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/user");
const app = express();

//connected to Database through dot env
mongoose
    .connect(process.env.MONGO)
    .then((res) => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

// creating the bluePrint
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // Timestamps saves the current time of the document created
);

// Creating a model out of blueprint
const User = new mongoose.model("User", userSchema);

app.use("/api/user", userRouter);

// The port of the backend
app.listen(3000, () => {
    console.log("Backend is running on port 3000");
});
