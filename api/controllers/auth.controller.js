import { User } from "../index.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// handles signing up to the site
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

//this handles signing in to the page
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword) return next(errorHandler(404, "Wrong credentials"));
        const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET); //Token for the cookies
        const { password: pass, ...rest } = validUser._doc; // return all the things except the password
        res.cookie("access_token", token, { httOnly: true })
            .status(200)
            .json(rest); //this creates a cookie in the browser
    } catch (error) {
        next(error);
    }
};
