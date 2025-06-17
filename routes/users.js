const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const auth = require("../middlewares/auth");
const { updateUserSchema } = require("../scripts/validations");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");


// get all users
router.get("/", async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0, loginAttempts: 0 });
        if (!users.length) return res.status(400).send("Users not found");
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});


// get all the creators
router.get("/creators", async (req, res, next) => {
    try {
        const users = await User.find({ isCreator: true }, { password: 0, loginAttempts: 0 });
        if (!users.length) return res.status(400).send("Users not found");
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});


// get a specific user
router.get("/:userId", auth, async (req, res, next) => {
    try {
        // 1. check for the user in the DB
        const user = await User.findById(req.params.userId, { password: 0, loginAttempts: 0 });
        if (!user) return res.status(400).send("User Not Found");

        // 2. return the user 
        res.status(200).send(user)

    } catch (error) {
        next(error);
    }
});

// get a specific user with out token
router.get("/free/:userId", async (req, res, next) => {
    try {
        // 1. check for the user in the DB
        const user = await User.findById(req.params.userId, { password: 0, loginAttempts: 0 });
        if (!user) return res.status(400).send("User Not Found");

        // 2. return the user 
        res.status(200).send(user)

    } catch (error) {
        next(error);
    }
});


// get users by ids
router.post("/byIds", async (req, res, next) => {
    const { userIds } = req.body;

    try {
        const users = await User.find({ _id: { $in: userIds } }, { password: 0 }).select("name image");
        res.status(200).send(users);
    } catch (error) {
        next(error)
    }
});


// update/edit user
router.put("/:userId", async (req, res, next) => {
    try {
        // validate the body
        const { error } = updateUserSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // check if user is exists & update
        let user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body);
        if (!user) return res.status(400).send("user does not exists");

        // create token
        const token = jwt.sign({ _id: user._id, isVerified: user.isVerified, isAdmin: user.isAdmin, isCreator: user.isCreator }, process.env.JWTKEY);
        res.status(201).send(token)

    } catch (error) {
        next(error);
    }
});


// delete user
router.delete("/:userId", auth, async (req, res, next) => {
    try {
        // 1. check if the user is admin
        if (!req.payload.isAdmin) return res.status(401).send("Authorization faild");

        // 2. check if the user exists & delete
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) return res.status(400).send("User Not Found");

        res.status(200).send("User as been deleted successfuly");
    } catch (error) {
        next(error);
    }
});


// change password
router.patch("/password", auth, async (req, res, next) => {
    try {
        // 1. check for the user in the DB
        const user = await User.findById(req.payload._id);
        if (!user) return res.status(400).send("User Not Found");

        // 2. check if the passwords are the same
        const result = await bcrypt.compare(req.body.password, user.password)
        if (result) return res.status(400).send("Your new password can't be the same as your old password")

        // 3. change & encrypt the user password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt)
        await user.save()


        // 3. alert the user successfuly
        res.status(200).send("Password as been changed successfuly")

    } catch (error) {
        next(error);
    }
});

// pay
router.patch("/pay", auth, async (req, res, next) => {
    try {
        // 1. check for the user in the DB
        const user = await User.findById(req.payload._id);
        if (!user) return res.status(400).send("User Not Found");

        // 2. chack if the user have enough to buy
        if (req.body.amount > user.pulcoins) return res.status(400).send("Not enough PulCoins to buy!");

        // 3. charge the user 
        user.pulcoins = user.pulcoins - req.body.amount;
        await user.save()


        // 4. alert the user successfuly
        res.status(200).send("User as been charged")

    } catch (error) {
        next(error);
    }
});

module.exports = router;
