const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { movieSchema, commentSchema } = require("../scripts/validations");
const Movie = require("../models/Movies");
const User = require("../models/Users");






// get all movies
router.get("/", async (req, res, next) => {
    try {
        const movies = await Movie.find().populate("creator", "name");

        if (!movies.length) return res.status(400).send("Movies not found");

        res.status(200).send(movies);
    } catch (error) {
        next(error);
    }
});


// get top movies
router.get("/topMovies", async (req, res, next) => {
    try {
        // get top 10 movies sorted by rate in descending order
        const topMovies = await Movie.find().sort({ rate: -1 }).limit(10);

        if (!topMovies || topMovies.length === 0) {
            return res.status(400).send("No top movies found");
        }

        res.status(200).send(topMovies);
    } catch (error) {
        next(error);
    }
});

// get 3 top movies 
router.get("/topMovies/mini", async (req, res, next) => {
    try {
        // get top 10 movies sorted by rate in descending order
        const topMovies = await Movie.find().sort({ rate: -1 }).limit(3);

        if (!topMovies || topMovies.length === 0) {
            return res.status(400).send("No top movies found");
        }

        res.status(200).send(topMovies);
    } catch (error) {
        next(error);
    }
});



// get a creator list of movies
router.get("/creator/:creatorId", async (req, res, next) => {
    try {

        // get the tmdb from the db
        const tmdb = await User.findOne({ name: "TMDB" })
        // specific for TMDB
        if (req.params.creatorId === "TMDB") {
            const movies = await Movie.find({ creator: { $in: tmdb._id } });
            if (!movies) return res.status(400).send("Movie Not Found");
            return res.status(200).send(movies.reverse())
        }


        const movies = await Movie.find({ creator: { $in: req.params.creatorId } });
        if (!movies) return res.status(400).send("Movie Not Found");

        res.status(200).send(movies)

    } catch (error) {
        next(error);
    }
});

// get a creators list of movies (not TMDB)
router.get("/creatorsMovies", async (req, res, next) => {
    try {
        const movies = await Movie.find({
            creator: { $ne: process.env.TMDB_ID || "TMDB" }
        });
        if (!movies) return res.status(400).send("Movie Not Found");

        res.status(200).send(movies)

    } catch (error) {
        next(error);
    }
});



// get a specific movie
router.get("/:movieId", async (req, res, next) => {
    try {
        // 1. check for the user in the DB
        const movie = await Movie.findById(req.params.movieId);
        if (!movie) return res.status(400).send("Movie Not Found");

        // 2. return the movie 
        res.status(200).send(movie)

    } catch (error) {
        next(error);
    }
});


// get movie by ids
router.post("/byIds", async (req, res, next) => {
    const { movieIds } = req.body;

    try {
        const movies = await Movie.find({ _id: { $in: movieIds } });
        res.status(200).send(movies);
    } catch (error) {
        next(error)
    }
});


// upload movie 
router.post("/", auth, async (req, res, next) => {
    try {
        console.log(req.body);

        // validate the body
        const { error } = movieSchema.validate(req.body);
        if (error) return res.status(400).send("Input Error: " + error.details[0].message);


        // check if movie is exists
        let movie = await Movie.findOne({ name: req.body.name });
        if (movie) return res.status(400).send("Movie is already exists");

        // create movie 
        movie = new Movie({ ...req.body, creator: req.payload._id, rate: 5 })
        await movie.save()
        res.status(201).send(movie)

    } catch (error) {
        next(error);

    }
});





// comment on a movie 
router.post("/comments/:movieId", auth, async (req, res, next) => {
    try {
        // validate the body
        const { error } = commentSchema.validate(req.body);
        if (error) return res.status(400).send("Input Error: " + error.details[0].message);

        // get the body data
        const { message, userId, time, token } = req.body;

        // check if movie is exists
        let movie = await Movie.findById(req.params.movieId);
        if (!movie) return res.status(400).send("Couldn't find the movie");

        // create comment
        if (message.length > 0) {
            movie.comments.push({ message, userId, time, token })
            await movie.save()
        }

        res.status(201).send("Thank you for your comment")

    } catch (error) {
        next(error);
    }
});


// update/edit movie
router.put("/:movieId", async (req, res, next) => {
    try {
        // validate the body
        const { error } = movieSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // check if movie is exists & update
        let movie = await Movie.findByIdAndUpdate(req.params.movieId, req.body);
        if (!movie) return res.status(400).send("Movie does not exists");

        res.status(201).send(movie)

    } catch (error) {
        next(error);
    }
});


// delete movie
router.delete("/:movieId", auth, async (req, res, next) => {
    try {
        // if not admin or not a movie creator
        if (!req.payload.isAdmin && !req.payload.isCreator) return res.status(401).send("Authorization faild");

        //  check if the movie exists & delete
        const movie = await Movie.findOneAndDelete({
            _id: req.params.movieId
        });
        if (!movie) return res.status(400).send("Movie Not Found");


        res.status(200).send("Movie as been deleted successfuly");
    } catch (error) {
        next(error);
    }
});




// favorite movie
router.patch("/favorite/:movieId", auth, async (req, res, next) => {
    try {
        const { userId, flag } = req.body;

        const movie = await Movie.findById(req.params.movieId);
        if (!movie) return res.status(400).send("Movie Not Found");

        const user = await User.findById(userId);
        if (!user) return res.status(400).send("User Not Found");

        if (!flag) {
            // Add from Favorites
            if (!movie.favorites.includes(userId)) {
                movie.favorites.push(userId);
            }
            if (!user.favorites.includes(movie._id)) {
                user.favorites.push(movie._id);
            }

            await movie.save();
            await user.save();
            res.status(200).send(`Thank you for favorizing ${movie.name}`);
        } else {
            // Remove from Favorites
            movie.favorites = movie.favorites.filter((id) => id.toString() !== userId.toString());
            user.favorites = user.favorites.filter((id) => id.toString() !== movie._id.toString());

            await movie.save();
            await user.save();
            res.status(200).send("Hope you will favorite us again :)");
        }
    } catch (error) {
        next(error);
    }
});








module.exports = router;
