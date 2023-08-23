const userDB = {
  users: require("../../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleSignin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    res
      .status(400)
      .json({ message: "Username and password must be provided." });

  const foundUser = userDB.users.find((u) => u.username === user);

  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
  }

  // Compare Password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    res.status(200).json({ message: "Login successful." });
  } else {
    res.status(401).json({ message: "Invalid password." });
  }
};

module.exports = handleSignin;
