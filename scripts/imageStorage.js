const express = require("express");
const router = express.Router();

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_S,
});

// Set multer storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "pulkeMovies/images",
        allowed_formats: ["jpg", "png", "jpeg"],
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

const upload = multer({ storage });

// Upload route
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const oldPublicId = req.body.oldPublicId;

        // אם נשלח מזהה של תמונה ישנה – מחק אותה
        if (oldPublicId) {
            try {
                const result = await cloudinary.uploader.destroy(oldPublicId);
                console.log("🗑️ Old image deleted:", result);
            } catch (deleteErr) {
                console.error("❌ Failed to delete old image:", deleteErr);
            }
        }

        // החזרת כתובת התמונה החדשה + public_id
        return res.status(200).send({
            message: "Image uploaded successfully",
            image: {
                src: req.file.path || req.file.secure_url,
                publicId: req.file.filename, // the new PublicId
            },
        });

    } catch (err) {
        console.error("Upload error:", err);
        return res.status(500).send({ message: "Upload failed" });
    }
});

module.exports = router;
