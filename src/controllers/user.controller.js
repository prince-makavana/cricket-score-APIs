const { fetchUserPhone } = require('../dao/user.dao');
const userService = require('../services/user.service');

let otpStore = {};

const createUser = async (req, res) => {
  try {
    const { phone, otp } = req.body
    if (!otpStore[phone] || otpStore[phone].otp !== otp || otpStore[phone].expiry < Date.now()) {
      return res.status(419).json({ success: false, message: 'Invalid OTP or OTP expired' });
    }
    const existingUser = await fetchUserPhone(phone)
    if (existingUser.length) {
      return res.status(409).json({ success: false, message: 'Phone number already exists' });
    }
    const createUser = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: createUser});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const sendOtpController = async (req, res) => {
  try {
    const { phone } = req.body;
    const otp = 1234 // Hardcoded OTP
    otpStore[phone] = { otp, expiry: Date.now() + 3000 };
    res.status(200).json({ success: true, otp });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  sendOtpController
}
