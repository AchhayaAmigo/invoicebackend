const User = require("../../model/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleSignin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.sendStatus(400);

  const foundUser = await User.findOne({ username: user }).exec();

  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
  }

  // Compare Password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    // create token
    const accessToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    
      foundUser.refreshToken = refreshToken;
      await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ message: "Invalid password." });
  }
};

module.exports = handleSignin;
