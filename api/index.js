const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
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

// The port of the backend
app.listen(3000, () => {
    console.log("Backend is running on port 3000");
});
