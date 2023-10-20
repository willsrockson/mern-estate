import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//imported Routes from the routes folder
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
const app = express();
app.use(express.json()); // Allow post request in json format.. if not for this, then body parser must be used

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
export const User = new mongoose.model("User", userSchema);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// The port of the backend
app.listen(3000, () => {
    console.log("Backend is running on port 3000");
});
