const express = require('express');
const userController = require('../controllers/user.controller');
const { userSchema } = require('../middlewares/middleware');

const userRoute = express.Router()

userRoute.post('/user/registration', userSchema, userController.createUser)
userRoute.post('/send-otp', userController.sendOtpController)

module.exports = userRoute;
