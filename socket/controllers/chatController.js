const Chat = require('../../models/Chat');

const getAllMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await Chat.find({ userId }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { userId, sender, message } = req.body;
        const newMsg = new Chat({ userId, sender, message });
        await newMsg.save();
        res.status(201).json(newMsg);
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message' });
    }
};

module.exports = {
    getAllMessages,
    sendMessage
}