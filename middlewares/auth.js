const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // 1. get the token 
        const token = req.header("Authorization")
        if (!token) return res.status(401).send("Access denied. No token provided")

        // 2. take the payload      
        req.payload = jwt.verify(token, process.env.JWTKEY);
        next()

    } catch (error) {
        res.status(400).send(error)
    }
};