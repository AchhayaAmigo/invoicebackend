const otpGenerator = require("otp-generator");

const OTPObject = {
    OTP : null,
    resetSession : false
};

  const handleOTP = async (req, res) =>{
    OTPObject.OTP = await otpGenerator.generate(6, {lowerCaseAlphabets : false, upperCaseAlphabets : false, specialChars : false});
    res.status(201).send({otp : OTPObject.OTP});
  }

  const handleVerifyOTP = async (req, res) =>{
    const {otp} = req.query;

    if(parseInt(OTPObject.OTP) === parseInt(otp)){
        OTPObject.OTP = null;
        OTPObject.resetSession = true;
        return res.status(201).send({msg : "Verify Successfully"});
    }
    return res.status(400).send({error : "Invalid OTP"});
  }
  module.exports = {handleOTP, handleVerifyOTP};