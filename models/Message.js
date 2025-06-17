const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "chats",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = model("messages", messageSchema);
module.exports = Message;
