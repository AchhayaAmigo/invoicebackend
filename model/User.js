const mongoose = require("mongoose");

const billSchema = {
  invoiceNumber: { type: String, required: true },
  billingDate: { type: String, required: true },
  dueDate: { type: String, required: true },
  customerName: { type: String, required: true },
  contact: { type: String, required: true },
  s3link: { type: String, required: true },
};

const companyDetailsSchema = {
  companyName: { type: String },
  gstNo: { type: String },
  cinNo: { type: String },
  contact: { type: String },
  tandc: { type: String },
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: { type: String },
  companyDetails: companyDetailsSchema ,
  bills: [billSchema] ,
});

const User = mongoose.model('User', userSchema);

module.exports = User;