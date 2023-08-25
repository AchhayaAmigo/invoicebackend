const express = require("express");
const router = express.Router();
const handleSignUp  = require("../controllers/user/signupController");
const handleSignin  = require("../controllers/user/authController");
const handleLogout  = require("../controllers/user/logoutController");
const { handleBillByID, handleBills } = require("../controllers/bill/billDetails");
const { handleGetDetails, handlePostDetails, handlePutDetails, handleDeleteDetails } = require("../controllers/company/companyDetails");
const verifyJWT = require("../middlewares/verifyJWT");
const { handleRefreshToken } = require("../controllers/refreshController");

router.get("/", (req, res) => {
  res.send("Testing Home Route");
});

router.post("/signin", handleSignin);
router.post("/signup", handleSignUp);
router.get("/logout", handleLogout);
router.get("/refresh", handleRefreshToken);

router.use(verifyJWT)
router.get("/bills", handleBills);
router.get("/bill/:billId", handleBillByID);

router
  .route("/details")
  .get(handleGetDetails)
  .post(handlePostDetails)
  .put(handlePutDetails)
  .delete(handleDeleteDetails)

module.exports = router;
