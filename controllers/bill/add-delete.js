const userDB = {
  users: require("../../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleAddBill = async (req, res) => {
  const user = req.user;
  const foundUser = userDB.users.find((u) => u.username === user);
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
  }

  foundUser.bills.push(req.body);
  userDB.setUsers(userDB.users);
  await fsPromises.writeFile(
    path.join(__dirname, "../../model/users.json"),
    JSON.stringify(userDB.users)
  );

  res.sendStatus(201);
};

const handleDeleteBill = (req, res) => {
  const user = req.user;
  const id = req.query.id;
  const foundUser = userDB.users.find((u) => u.username === user);
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
  userDB.setUsers(userDB.users);
  fsPromises.writeFile(
    path.join(__dirname, "../../model/users.json"),
    JSON.stringify(userDB.users)
  );

  res.sendStatus(204);
};

module.exports = { handleAddBill, handleDeleteBill };
