const User = require("../../model/User");

const handleBills = async (req, res) => {
  const user = req.user;
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
  }

  res.json(foundUser.bills);
};

const handleBillByID = async (req, res) => {
  const user = req.user;
  const id = req.query.id;

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
    return;
  }

  const foundBill = foundUser.bills.find((b) => b.invoiceNumber === id);
  if (!foundBill) {
    res.status(400).json({ message: "No bill found with that ID." });
  }
  res.json(foundBill);
};

module.exports = { handleBills, handleBillByID };
