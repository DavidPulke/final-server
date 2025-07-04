const express = require("express");
var bodyParser = require('body-parser');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const helmet = require("helmet");
const rateLimit = require('express-rate-limit');

// routes
const chat = require('./routes/chat');
const users = require("./routes/users");
const movies = require("./routes/movies");
const messages = require("./routes/messages");
const login_register = require("./routes/register-login");
const imageUpload = require("./scripts/imageStorage");


// keep the site awake
app.get("/api/ping", (req, res) => {
  res.send("pong");
});


// limiter
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 400,
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);
app.use(helmet());


// connect to database
mongoose.connect(process.env.DB)
  .then(() => console.log("✅ Connected to DB"))
  .catch(err => console.error("❌ DB Connection Error:", err));


// logger
const logger = (req, res, next) => {
  console.log(req.method + req.url)
  next()
};



app.use(logger);
app.use("/api/users", login_register);
app.use("/api/users", imageUpload);
app.use("/api/users", users);
app.use("/api/movies", movies);
app.use("/api/messages", messages);
app.use('/api/chats', chat);

// error handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));
