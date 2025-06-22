const axios = require("axios");
const Movie = require("../models/Movies");
require("dotenv").config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TOTAL_PAGES = 5;

const seedTmdbMovies = async (creatorMap) => {
    try {
        let moviesAdded = 0;

        for (let page = 1; page <= TOTAL_PAGES; page++) {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: "en-US",
                    page: page
                }
            });

            const movies = response.data.results;

            for (const movie of movies) {
                const exists = await Movie.findOne({ name: movie.title });
                if (!exists) {
                    // Characters request
                    let mainChars = [];
                    try {
                        const creditsRes = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits`, {
                            params: {
                                api_key: TMDB_API_KEY
                            }
                        });

                        const castArray = creditsRes.data.cast;
                        if (Array.isArray(castArray) && castArray.length) {
                            mainChars = castArray.slice(0, 3).map(actor => actor.name);
                        } else {
                            mainChars = ["Unknown"];
                        }
                    } catch (err) {
                        console.error(`⚠️ Failed to fetch cast for movie ID ${movie.id}:`, err.message);
                        mainChars = ["Unknown"];
                    }

                    const newMovie = {
                        name: movie.title || "",
                        description: movie.overview.length > 1 ? movie.overview : "No Description",
                        externalId: movie.id,
                        duration: movie.runtime ? movie.runtime : 75,
                        source: "tmdb",
                        mainChars: mainChars,
                        rate: movie.vote_average,
                        year: movie.release_date ? parseInt(movie.release_date.slice(0, 4)) : null,
                        creator: creatorMap["TMDB"],
                        image: {
                            src: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "",
                            alt: `${movie.title} Poster`,
                            publicId: null
                        }
                    };

                    if (moviesAdded === 120) return;
                    await Movie.create(newMovie);
                    console.log(`✅ Added: ${movie.title}`);
                    moviesAdded++;
                } else {
                    console.log(`ℹ️ Already exists: ${movie.title}`);
                    moviesAdded++;
                }
            }
        }

        console.log(`🎉 TMDb movies seeding completed! Total new movies added: ${moviesAdded}`);
    } catch (error) {
        console.error("❌ Seeding error:", error);
    }
};

module.exports = {
    seedTmdbMovies
};
