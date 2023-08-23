const handleBills = (req, res) => {
  res.send("All Bills");
};

const handleBillByID = (req, res) => {
  res.send("Bill by ID");
};

module.exports = { handleBills, handleBillByID };
