const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chatSchema = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true
        }
    ],
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "messages"
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Chat = model("chats", chatSchema);
module.exports = Chat;
