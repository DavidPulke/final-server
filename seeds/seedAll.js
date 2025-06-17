const mongoose = require("mongoose");
const { seedUsers } = require("./seedUsers");
const { seedCreatorMovies } = require("./seedCreatorMovies");
const { seedTmdbMovies } = require("./seedTmdbMovies");
require("dotenv").config();
const User = require("../models/Users");

const seedAll = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("✅ Connected to MongoDB");

        console.log("🔄 Seeding users...");
        await seedUsers();

        const creators = await User.find({ isCreator: true });
        const creatorMap = {};
        creators.forEach(creator => {
            creatorMap[creator.name] = creator._id;
        });

        console.log("🔄 Seeding creator movies...");
        await seedCreatorMovies(creatorMap);

        console.log("🔄 Seeding TMDb movies...");
        await seedTmdbMovies(creatorMap);

        console.log("🎉 All seeding completed!");
    } catch (error) {
        console.error("❌ Seeding error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB");
    }
};

seedAll();
