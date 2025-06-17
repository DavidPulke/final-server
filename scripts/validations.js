const Joi = require("joi")

const registerSchema = Joi.object({
    name: Joi.string().required().min(2).max(256),
    phone: Joi.string().required().min(9).max(11),
    email: Joi.string().required().min(5).max(40),
    password: Joi.string().required().min(7),
    image: Joi.object({
        src: Joi.string().allow(null).allow('').optional(),
        alt: Joi.string().optional().allow(null).allow(''),
        publicId: Joi.string().optional().allow('')
    })
});

const updateUserSchema = Joi.object({
    name: Joi.string().required().min(2).max(256),
    phone: Joi.string().required().min(9).max(11),
    email: Joi.string().required().min(5).max(40),
    image: Joi.object({
        src: Joi.string().allow(null).allow('').optional(),
        alt: Joi.string().optional().allow(null).allow(''),
        publicId: Joi.string().optional().allow('')
    }),
    isCreator: Joi.boolean().optional(),
});


const movieSchema = Joi.object({
    // movie name
    name: Joi.string().required().min(2).max(256),
    // movie category/s
    category: Joi.array().items(Joi.string().min(2).max(40).required()).min(1).required(),
    // movie description
    description: Joi.string().required().min(5).max(500),
    // the year the movie as been released
    year: Joi.string().required().min(4).max(4),
    // the duration of the movie
    duration: Joi.string().required().min(2).max(3),
    // the creator of the movie
    creator: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    // the movie main characters
    mainChars: Joi.array().items(Joi.string().min(2).max(50)).required(),
    // who as been favorite this movie
    favorites: Joi.array().items(Joi.string().min(2).max(50).optional()).optional(),
    // the movie image
    image: Joi.object({
        src: Joi.string().uri().optional(),
        alt: Joi.string().optional().allow(''),
        publicId: Joi.string().optional().allow('')
    }).optional(),
    // the movie rating
    rate: Joi.number().min(0).max(10).optional(),
    // the movie comments
    comments: Joi.array().items(Joi.object({
        userId: Joi.string().required(),
        message: Joi.string().required().min(2).max(500),
        time: Joi.date().required(),
        likes: Joi.array().items(Joi.string()).optional()
    })).optional()
});


const commentSchema = Joi.object({
    userId: Joi.string().required(),
    message: Joi.string().required(),
    token: Joi.string().required(),
    time: Joi.string().required()
});




module.exports = {
    registerSchema,
    updateUserSchema,
    movieSchema,
    commentSchema
}