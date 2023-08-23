const handleLogout = (req, res) => {
  res.status(200).json({ message: "Logout successful." });
};

module.exports = handleLogout;
