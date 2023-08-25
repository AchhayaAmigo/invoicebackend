const userDB = {
  users: require("../../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleSignUp = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    res
      .status(400)
      .json({ message: "Username and password must be provided." });

  const userExists = userDB.users.find((person) => person.username === user);

  if (userExists) {
    res.status(409).json({ message: "Username already exists." }); // Provide a response message
    return; // Return early to prevent further execution
  }

  try {
    const hashedPswd = await bcrypt.hash(pwd, 10);
    const newUser = {
      username: user,
      password: hashedPswd,
      companyDetails: {
        companyName: "",
        gstNo: "",
        cinNo: "",
        contact: "",
        tandc: ""
      }
    };
    userDB.setUsers([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "../../model/users.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
    res.status(201).json({ success: `New user ${newUser.username} created.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleSignUp;
