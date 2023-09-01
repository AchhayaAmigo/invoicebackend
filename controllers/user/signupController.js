const User = require("../../model/User");
const bcrypt = require("bcrypt");

const handleSignUp = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    res
      .status(400)
      .json({ message: "Username and password must be provided." });

  const userExists = await User.findOne({ username: user }).exec();

  if (userExists) {
    res.status(409).json({ message: "Username already exists." }); // Provide a response message
    return; // Return early to prevent further execution
  }

  try {
    const hashedPswd = await bcrypt.hash(pwd, 10);
    const newUser = new User({
      username: user,
      password: hashedPswd,
      refreshToken: "",
      companyDetails: {
        companyName: "",
        gstNo: "",
        cinNo: "",
        contact: "",
        tandc: "",
      },
      bills: [],
    });

    // store the user
    await newUser.save();

    res.status(201).json({ success: `New user ${newUser.username} created.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleSignUp;
