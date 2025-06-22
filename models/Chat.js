const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chatSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "messages"
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


const Chat = model("chats", chatSchema);
module.exports = Chat;
