const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { registerSchema } = require("../scripts/validations");


const loginSchema = Joi.object({
    // email
    email: Joi.string().required().email(),

    // password
    password: Joi.string().required().min(7).max(20),
})


// register
router.post("/", async (req, res) => {
    try {
        // validate the body
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).send("Input Error: " + error.details[0].message);


        // check if user is exists
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("user is already exists");

        // create user & encrypt password
        user = new User(req.body)
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()

        // create token
        const token = jwt.sign({ _id: user._id, isVerified: user.isVerified, isAdmin: user.isAdmin, isCreator: user.isCreator }, process.env.JWTKEY);
        res.status(201).send(token)

    } catch (error) {
        res.status(400).send(error)
    }
});



// login
router.post("/login", async (req, res) => {
    try {
        // validate the body
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);


        // check if user is exists
        const { password, email } = req.body
        let user = await User.findOne({ email });
        if (!user) return res.status(400).send("Invalid email or password");

        // Filter out old login attempts (>24 hours)
        const now = Date.now();
        user.loginAttempts = user.loginAttempts.filter(
            attempt => now - new Date(attempt).getTime() < 24 * 60 * 60 * 1000
        );

        // till when the user is blocked
        const getTill = () => {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            const loginAttempts = user.loginAttempts
            const lastAttempt = loginAttempts[loginAttempts.length - 1];
            const minutes = String(lastAttempt.getMinutes()).padStart(2, "0");
            return `${lastAttempt.getHours()}:${minutes}, ${days[(lastAttempt.getDay() + 1) % 7]}`
        }

        // check if user is locked
        if (user.loginAttempts.length > 2) return res.status(400).send(`Your Account is Bloked till: ${getTill()}`);


        // check the password
        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            user.loginAttempts.push(new Date());
            await user.save()
            if (user.loginAttempts.length > 2) {

                return res.status(400).send(`Your Account is Bloked till: ${getTill()}`);
            }

            return res.status(400).send("Invalid email or password");
        }


        // create token
        user.loginAttempts = []
        await user.save()

        const token = jwt.sign({ _id: user._id, email: user.email, isAdmin: user.isAdmin, isCreator: user.isCreator }, process.env.JWTKEY);
        res.status(201).send(token);

    } catch (error) {
        console.log(error);

        res.status(400).send(error)
    }
});








module.exports = router;