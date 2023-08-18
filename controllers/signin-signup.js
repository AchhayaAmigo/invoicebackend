const handleSignin = (req, res) => {
  res.send("Login");
};

const handleSignUp = (req, res) => {
  res.send("SignUp");
};

module.exports = { handleSignin, handleSignUp };
