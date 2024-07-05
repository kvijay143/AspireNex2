import User from "../models/user.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    console.log('Signup request received:'); // Debugging log
    const { username, password } = req.body;

    if (!username || !password || username === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { username, password } = req.body;
    console.log('Signin request received:',); // Debugging log

    try {
        const validUser = await User.findOne({ username });
        if (!validUser) return next(errorHandler(404, "User not Found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

        const { password: pass, ...rest } = validUser._doc;
        res.status(200);
        res.json(rest);
    } catch (error) {
        next(error);
    }
};

export const user = async (req, res) => {
    res.send("hello user");
};
