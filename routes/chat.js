const express = require('express');
const { getAllMessages, sendMessage } = require('../socket/controllers/chatController');
const auth = require("../middlewares/auth");

const router = express.Router();

// API: Get chat history between admin and user
router.get('/:userId/:adminId', auth, async (req, res) => {
    const { userId, adminId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { from: userId, to: adminId },
                { from: adminId, to: userId }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

router.get('/:userId', getAllMessages); // קבל את כל ההודעות למשתמש
router.post('/', sendMessage); // שליחת הודעה

module.exports = router;
