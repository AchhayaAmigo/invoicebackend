const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Testing Home Route");
});

const handleSignin = (req, res) => {
  res.send("Login");
};

const handleSignUp = (req, res) => {
  res.send("SignUp");
};

const handleBills = (req, res) => {
  res.send("All Bills");
};

const handleBillByID = (req, res) => {
  res.send("Bill by ID");
};

const handleGetDetails = (req, res) => {
  res.send("Company Details Get");
};

const handlePostDetails = (req, res) => {
  res.send("Company Details Post");
};

const handlePutDetails = (req, res) => {
  res.send("Company Details Put");
};

router.post("/signin", handleSignin);
router.post("/signup", handleSignUp);

router.get("/bills", handleBills);
router.get("/bill/:billId", handleBillByID);

router.route("/details")
.get(handleGetDetails)
.post(handlePostDetails)
.put(handlePutDetails);

module.exports = router;
