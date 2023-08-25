const userDB = {
  users: require("../../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleBills = (req, res) => {
  const user = req.user;
  const foundUser = userDB.users.find((u) => u.username === user);
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
  }

  res.json(foundUser.bills);
};

const handleBillByID = (req, res) => {
  const user = req.user;
  const id = req.query.id;

  const foundUser = userDB.users.find((u) => u.username === user);
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
