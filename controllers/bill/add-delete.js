const User = require("../../model/User");

const handleAddBill = async (req, res) => {
  const user = req.user;
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
  }

  foundUser.bills.push(req.body);
  await foundUser.save();

  res.sendStatus(201);
};

const handleDeleteBill = async (req, res) => {
  const user = req.user;
  const id = req.query.id;
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
  }

  const index = foundUser.bills.findIndex((b) => b.invoiceNumber === id);
  if (index === -1) {
    res.status(404).json({ message: "Bill not found." });
    return;
  }

  foundUser.bills.splice(index, 1);
  await foundUser.save();

  res.sendStatus(204);
};

module.exports = { handleAddBill, handleDeleteBill };
