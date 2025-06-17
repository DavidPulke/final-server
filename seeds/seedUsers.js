const bcrypt = require("bcryptjs");
const User = require("../models/Users");
require("dotenv").config();

const seedUsers = async () => {
    try {
        const salt = await bcrypt.genSalt(10);

        const users = [
            {
                name: "David Polak",
                phone: "0536061630",
                email: "davidpolak10201@gmail.com",
                password: await bcrypt.hash("David@12345", salt),
                isAdmin: true,
                isVerified: true,
                isCreator: false,
                pulcoins: 1000,
                image: {
                    src: "https://yt3.ggpht.com/yti/ANjgQV_dLZ3aj3Q0HhmHvL8njMp87zAsNbBOdqjb-r05hMKFV3c=s88-c-k-c0x00ffffff-no-rj",
                    alt: "Default Avatar",
                    publicId: "default123"
                }
            },
            {
                name: "Marvel",
                phone: "0556661630",
                email: "marvel@pulkemovies.com",
                password: await bcrypt.hash("David@12345", salt),
                isVerified: true,
                isCreator: true,
                pulcoins: 800,
                image: {
                    src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1747929617/MARVEL-POSTER_dsvwwi.jpg",
                    alt: "Marvel Avatar",
                    publicId: "default123"
                }
            },
            {
                name: "DC",
                phone: "0507654321",
                email: "DC@pulkemovies.com",
                password: await bcrypt.hash("DCmovies@12345", salt),
                isCreator: true,
                isVerified: true,
                pulcoins: 500,
                image: {
                    src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1747929576/DC-POSTER_vwctnz.png",
                    alt: "DC Avatar",
                    publicId: "default123"
                }
            },
            {
                name: "Pixar",
                phone: "0501234567",
                email: "pixar@pulkemovies.com",
                password: await bcrypt.hash("Pixar123!", salt),
                isCreator: true,
                isVerified: true,
                pulcoins: 300,
                image: {
                    src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1747929079/PIXAR-POSTER.jpg_q89lgs.webp",
                    alt: "Pixar Avatar",
                    publicId: "pixar123"
                }
            },
            {
                name: "TMDB",
                phone: "0506699885",
                email: "tmdb@pulkemovies.com",
                password: await bcrypt.hash("Tmdb!12345", salt),
                isCreator: true,
                isVerified: true,
                pulcoins: 600,
                image: {
                    src: "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg",
                    alt: "TMDB Avatar",
                    publicId: "TMDB123"
                }
            },
            {
                name: "Warner Bros",
                phone: "0501234567",
                email: "WB@pulkemovies.com",
                password: await bcrypt.hash("Wbros@12345", salt),
                isCreator: true,
                isVerified: true,
                pulcoins: 200,
                image: {
                    src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1747929096/WB-POSTER_x1rnae.svg",
                    alt: "WB Avatar",
                    publicId: "WB123"
                }
            },
            {
                name: "20th Centruy",
                phone: "0502345678",
                email: "20th@pulkemovies.com",
                password: await bcrypt.hash("20th@12345", salt),
                isCreator: true,
                isVerified: true,
                pulcoins: 200,
                image: {
                    src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1747929036/20TH-POSTER_gugw6c.jpg",
                    alt: "20th Avatar",
                    publicId: "20th123"
                }
            },
            {
                name: "Universal",
                phone: "0503456789",
                email: "universal@pulkemovies.com",
                password: await bcrypt.hash("Universal@12345", salt),
                isCreator: true,
                isVerified: true,
                pulcoins: 150,
                image: {
                    src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1747929091/UNIVERSAL-POSTER.png_fatest.webp",
                    alt: "universal Avatar",
                    publicId: "universal123"
                }
            },
            {
                name: "DreamWorks",
                phone: "0504567891",
                email: "dreamworks@pulkemovies.com",
                password: await bcrypt.hash("DreamWorks@12345", salt),
                isCreator: true,
                isVerified: true,
                pulcoins: 450,
                image: {
                    src: "https://i.ytimg.com/vi/cRTl-lInUAo/maxresdefault.jpg",
                    alt: "DreamWorks Avatar",
                    publicId: "DreamWorks123"
                }
            },
            {
                name: "Paramount",
                phone: "0505678912",
                email: "paramount@pulkemovies.com",
                password: await bcrypt.hash("Paramount@12345", salt),
                isCreator: true,
                isVerified: true,
                pulcoins: 320,
                image: {
                    src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1747929064/PARAMOUNT-POSTER_c9ki1o.png",
                    alt: "Paramount Avatar",
                    publicId: "paramount123"
                }
            },
            {
                name: "Sony Pictures",
                phone: "0506789123",
                email: "sony@pulkemovies.com",
                password: await bcrypt.hash("Sony@12345", salt),
                isCreator: true,
                isVerified: true,
                pulcoins: 270,
                image: {
                    src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1747929085/SONY-POSTER_wqfrqk.jpg",
                    alt: "Sony Avatar",
                    publicId: "sony123"
                }
            },
            {
                name: "Lionsgate",
                phone: "0507891234",
                email: "lionsgate@pulkemovies.com",
                password: await bcrypt.hash("Lionsgate@12345", salt),
                isCreator: true,
                isVerified: true,
                pulcoins: 180,
                image: {
                    src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1747929049/LIONSGATE-POSTER_d6v7ah.jpg",
                    alt: "Lionsgate Avatar",
                    publicId: "lionsgate123"
                }
            },
            {
                name: "Columbia Pictures",
                phone: "0508912345",
                email: "columbia@pulkemovies.com",
                password: await bcrypt.hash("Columbia@12345", salt),
                isCreator: true,
                isVerified: true,
                pulcoins: 390,
                image: {
                    src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1747929008/COLOMBIA-POSTER_yjyicn.png",
                    alt: "Columbia Avatar",
                    publicId: "columbia123"
                }
            }


        ];

        let insertedCount = 0;
        const createdUsers = {};

        for (const user of users) {
            const exists = await User.findOne({ email: user.email });
            if (!exists) {
                const created = await User.create(user);
                console.log(`✅ User ${user.name} created`);
                createdUsers[user.name] = created._id;
                insertedCount++;
            } else {
                console.log(`ℹ️ User ${user.name} already exists`);
                createdUsers[user.name] = exists._id;
            }
        }

        if (insertedCount === 0) {
            console.log("ℹ️ All users already exist, nothing was added.");
        } else {
            console.log(`🎉 Seeded ${insertedCount} new users.`);
        }

        return createdUsers;

    } catch (error) {
        console.error("❌ Seeding error:", error);
        return {};
    }
};

module.exports = {
    seedUsers
};
