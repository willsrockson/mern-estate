import { User } from "../index.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const singup = async (req, res, next) => {
    const { email, username, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json("user created successfuly");
    } catch (error) {
        next(error); //Displays the error handler in Index.js
    }
};
