const handleGetDetails = (req, res) => {
  res.send("Company Details Get");
};

const handlePostDetails = (req, res) => {
  res.send("Company Details Post");
};

const handlePutDetails = (req, res) => {
  res.send("Company Details Put");
};

const handleDeleteDetails = (req, res) => {
  res.send("Company Details Delete");
};

module.exports = {
  handleGetDetails,
  handlePostDetails,
  handlePutDetails,
  handleDeleteDetails
};
