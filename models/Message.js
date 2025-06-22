const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = model("messages", messageSchema);
module.exports = Message;
