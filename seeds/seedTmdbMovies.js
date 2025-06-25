const axios = require("axios");
const Movie = require("../models/Movies");
require("dotenv").config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TOTAL_PAGES = 5;

const seedTmdbMovies = async (creatorMap) => {
    try {
        let moviesAdded = 0;

        for (let page = 1; page <= TOTAL_PAGES; page++) {
            const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
                params: {
                    api_key: TMDB_API_KEY,
                    language: "en-US",
                    page,
                },
            });

            const movies = response.data.results;

            for (const movie of movies) {
                const exists = await Movie.findOne({ name: movie.title });
                if (exists) {
                    console.log(`ℹ️ Already exists: ${movie.title}`);
                    continue;
                }

                // ❗ בקשה אחת שמביאה גם videos, credits, genres, runtime
                const fullDetails = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
                    params: {
                        api_key: TMDB_API_KEY,
                        language: "en-US",
                        append_to_response: "videos,credits",
                    },
                });

                const data = fullDetails.data;

                // 🔸 שליפת שחקנים ראשיים
                const mainChars = Array.isArray(data.credits?.cast)
                    ? data.credits.cast.slice(0, 3).map(actor => actor.name)
                    : ["Unknown"];

                // 🔸 שליפת הטריילר מיוטיוב (אם קיים)
                const trailerObj = data.videos?.results.find(
                    v => v.site === "YouTube" && v.type === "Trailer"
                );
                const trailer = trailerObj ? `https://www.youtube.com/watch?v=${trailerObj.key}` : null;

                // 🔸 שליפת הקטגוריות (שמות)
                const category = Array.isArray(data.genres)
                    ? data.genres.map(g => g.name)
                    : [];

                const newMovie = {
                    name: data.title || "Untitled",
                    description: data.overview?.trim() || "No Description",
                    externalId: data.id,
                    duration: data.runtime || 75,
                    source: "tmdb",
                    category,
                    mainChars: mainChars.length ? mainChars : ["Unknown"],
                    rate: typeof data.vote_average === "number" ? data.vote_average : 0,
                    year: data.release_date ? parseInt(data.release_date.slice(0, 4)) : null,
                    creator: creatorMap["TMDB"] || null,
                    trailer,
                    image: {
                        src: data.poster_path
                            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                            : "",
                        alt: `${data.title} Poster`,
                        publicId: null,
                    },
                };

                await Movie.create(newMovie);
                console.log(`✅ Added: ${data.title}`);
                moviesAdded++;

                if (moviesAdded >= 120) break;
            }

            if (moviesAdded >= 120) break;
        }

        console.log(`🎉 TMDb movies seeding completed! Total new movies added: ${moviesAdded}`);
    } catch (error) {
        console.error("❌ Seeding error:", error.message);
    }
};

module.exports = {
    seedTmdbMovies,
};
