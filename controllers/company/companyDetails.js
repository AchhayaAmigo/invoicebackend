const userDB = {
  users: require("../../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleGetDetails = (req, res) => {
  const user = req.user;
  const foundUser = userDB.users.find((u) => u.username === user);
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
  }
  res.json(foundUser.companyDetails);
};

const handlePostDetails = async (req, res) => {
  const user = req.user;
  const foundUser = userDB.users.find((u) => u.username === user);
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
  }

  foundUser.companyDetails = req.body;
  userDB.setUsers(userDB.users);
  await fsPromises.writeFile(
    path.join(__dirname, "../../model/users.json"),
    JSON.stringify(userDB.users)
  );

  res.sendStatus(201);
};

const handlePutDetails = async (req, res) => {
  const user = req.user;
  const updatedDetails = req.body;

  const foundUser = userDB.users.find((u) => u.username === user);
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
    return;
  }

  foundUser.companyDetails = { ...foundUser.companyDetails, ...updatedDetails };
  userDB.setUsers(userDB.users);
  await fsPromises.writeFile(
    path.join(__dirname, "../../model/users.json"),
    JSON.stringify(userDB.users)
  );

  res.json({ message: "Company details updated successfully." });
};

const handleDeleteDetails = async (req, res) => {
  const user = req.user;

  const foundUser = userDB.users.find((u) => u.username === user);
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
    return;
  }

  foundUser.companyDetails = {
    companyName: "",
    gstNo: "",
    cinNo: "",
    contact: "",
    tandc: "",
  };
  userDB.setUsers(userDB.users);
  await fsPromises.writeFile(
    path.join(__dirname, "../../model/users.json"),
    JSON.stringify(userDB.users)
  );

  res.json({ message: "Company details deleted successfully." });
};

module.exports = {
  handleGetDetails,
  handlePostDetails,
  handlePutDetails,
  handleDeleteDetails,
};
