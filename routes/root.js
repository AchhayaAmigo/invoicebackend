const express = require("express");
const router = express.Router();
const { handleBillByID, handleBills } = require("../controllers/billDetails");
const { handleSignUp, handleSignin } = require("../controllers/signin-signup");
const { handleGetDetails, handlePostDetails, handlePutDetails } = require("../controllers/companyDetails");

router.get("/", (req, res) => {
  res.send("Testing Home Route");
});

router.post("/signin", handleSignin);
router.post("/signup", handleSignUp);

router.get("/bills", handleBills);
router.get("/bill/:billId", handleBillByID);

router
  .route("/details")
  .get(handleGetDetails)
  .post(handlePostDetails)
  .put(handlePutDetails);

module.exports = router;
