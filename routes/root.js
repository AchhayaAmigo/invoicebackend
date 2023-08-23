const express = require("express");
const router = express.Router();
const handleSignUp  = require("../controllers/user/signupController");
const handleSignin  = require("../controllers/user/authController");
const handleLogout  = require("../controllers/user/logoutController");
const { handleBillByID, handleBills } = require("../controllers/bill/billDetails");
const { handleGetDetails, handlePostDetails, handlePutDetails } = require("../controllers/company/companyDetails");

router.get("/", (req, res) => {
  res.send("Testing Home Route");
});

router.post("/signin", handleSignin);
router.post("/signup", handleSignUp);
router.get("/logout", handleLogout);

router.get("/bills", handleBills);
router.get("/bill/:billId", handleBillByID);

router
  .route("/details")
  .get(handleGetDetails)
  .post(handlePostDetails)
  .put(handlePutDetails);

module.exports = router;
