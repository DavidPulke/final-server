const moviesJson = require("../data/movies.json")
const Movie = require("../models/Movies");
console.log(moviesJson);

const seedCreatorMovies = async (creatorMap) => {
    try {


        const movies = moviesJson;

        for (const movie of movies) {
            const exists = await Movie.findOne({ name: movie.name });
            if (!exists) {
                await Movie.create(movie);
                console.log(`✅ Added: ${movie.name}`);
            } else {
                console.log(`ℹ️ Already exists: ${movie.name}`);
            }
        }

        console.log("🎉 Creator movies seeding completed!");
    } catch (error) {
        console.error("❌ Seeding error:", error);
    }
};

module.exports = {
    seedCreatorMovies
};
