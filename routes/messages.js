const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Message = require("../models/Message");
const User = require("../models/Users");

// 🔵 send message
router.post("/", auth, async (req, res, next) => {
    try {
        const { text, to } = req.body;
        console.log(req.body);

        if (!text || !to) {
            console.log("error here");

            return res.status(400).send({ error: "Text and recipient (to) are required" });
        }

        const message = new Message({
            from: req.payload._id,
            to,
            text
        });

        await message.save();
        res.status(201).send({ msg: "Message sent successfully", message });
    } catch (error) {
        next(error)
    }
});


// 🟢 get all messages
router.get("/", auth, async (req, res, next) => {
    try {
        const messages = await Message.find({
            $or: [{ from: req.payload._id }, { to: req.payload._id }]
        })
            .populate("from", "name email")
            .populate("to", "name email")
            .sort({ createdAt: 1 });

        res.send(messages);
    } catch (error) {
        next(error)
    }
});



// 🟢 קבלת כל המשתמשים ששלחו הודעות לאדמין
router.get("/users", auth, async (req, res, next) => {
    try {
        if (!req.payload.isAdmin) {
            return res.status(403).send("Access denied");
        }

        const userIds = await Message.distinct("from", { to: req.payload._id });
        const users = await User.find({ _id: { $in: userIds } }, "name image");

        res.send(users.reverse());
    } catch (error) {
        next(error);
    }
});

// 🟢 קבלת ההודעות בין אדמין למשתמש ספציפי
router.get("/:userId", auth, async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const messages = await Message.find({
            $or: [
                { from: req.payload._id, to: userId },
                { from: userId, to: req.payload._id }
            ]
        })
            .populate("from", "name email image")
            .populate("to", "name email image")
            .sort({ createdAt: 1 });

        res.send(messages);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
