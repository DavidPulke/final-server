const { Schema, model } = require("mongoose");



const userSchema = new Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 256,
        required: true
    },
    phone: {
        type: String,
        minlength: 9,
        maxlength: 11,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 40,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 7,
        required: true
    },
    image: {
        type: {
            src: {
                type: String,
                maxlength: 256,
            },
            alt: {
                type: String,
                maxlength: 256,
            },
            publicId: {
                type: String
            }
        }
    },
    favorites: {
        type: [String],
        default: []
    },
    pulcoins: {
        type: Number,
        default: 0
    },
    isCreator: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    loginAttempts: {
        type: [Date],
        default: []
    }


});


const User = model("users", userSchema);
module.exports = User;