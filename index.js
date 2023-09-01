require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");
const credentials = require("./middlewares/credentials");
const connectDB = require("./config/dbConnection");
const PORT = process.env.PORT || 8080;

// Connect to database
connectDB();

// custom middleware logger
app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.use(cookieParser());

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
    console.log("Press Ctrl+C to quit.");
  });
});
