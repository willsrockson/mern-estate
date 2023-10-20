import { User } from "../index.js";
import bcryptjs from "bcryptjs";

export const singup = async (req, res) => {
    const { email, username, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json("user created successfuly");
    } catch (error) {
        res.status(500).json(error.message);
    }
};
