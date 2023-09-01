const User = require("../../model/User");

const handleGetDetails = async (req, res) => {
  const user = req.user;
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
  }
  res.json(foundUser.companyDetails);
};

const handlePostDetails = async (req, res) => {
  const user = req.user;
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
  }

  foundUser.companyDetails = req.body;
  await foundUser.save();

  res.sendStatus(201);
};

const handlePutDetails = async (req, res) => {
  const user = req.user;
  const updatedDetails = req.body;

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "Username doesn't exist in the database." });
    return;
  }

  foundUser.companyDetails = { ...foundUser.companyDetails, ...updatedDetails };
  await foundUser.save();

  res.json({ message: "Company details updated successfully." });
};

const handleDeleteDetails = async (req, res) => {
  const user = req.user;

  const foundUser = await User.findOne({ username: user }).exec();
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
  await foundUser.save();

  res.json({ message: "Company details deleted successfully." });
};

module.exports = {
  handleGetDetails,
  handlePostDetails,
  handlePutDetails,
  handleDeleteDetails,
};
