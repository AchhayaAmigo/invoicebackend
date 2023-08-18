const express = require("express");
const app = express();
const cors = require("cors");
const { logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 8080;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Testing Home Route");
});

const handleSignin = (req, res) => {
    res.send("Login");
}

// write handleSignUp function same as login function
const handleSignUp = (req, res) => {
    res.send("SignUp");
}

const handleBills = (req, res) => {
    res.send("All Bills");
}

const handleBillByID = (req, res) => {
    res.send("Bill by ID");
}

const handleDetails = (req, res) => {
    res.send("Company Details");
}

app.post("/signin", handleSignin);
app.post("/signup", handleSignUp);
app.get("/bills", handleBills);
app.get("/bill/:billId", handleBillByID);
app.get("/details", handleDetails);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
  console.log("Press Ctrl+C to quit.");
});
