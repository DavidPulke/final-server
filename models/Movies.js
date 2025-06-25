const { Schema, model } = require("mongoose");



const moviesSchema = new Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 256,
        required: true,
        unique: true
    },
    category: {
        type: [String],
        required: true
    },
    trailer: {
        type: String,
        default: null
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 2048,
        required: true
    },
    year: {
        type: Number,
        min: 1880,
        max: new Date().getFullYear(),
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    mainChars: {
        type: [String],
        required: true
    },
    favorites: {
        type: [String],
        default: []
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
    rate: {
        type: Number,
        default: 0
    },
    comments: {
        type: [{
            userId: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            time: {
                type: Date,
                default: Date.now
            },
            likes: {
                type: [String]
            }
        }],
        default: []
    }


});


const Movie = model("movies", moviesSchema);
module.exports = Movie;