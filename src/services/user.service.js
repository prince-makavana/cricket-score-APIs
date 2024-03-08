const userDao = require('../dao/user.dao');
const moment = require('moment')

const createUser = async (userData) => {
  try {
    userData.dob = moment(new Date(userData.dob)).format('YYYY-MM-DD')
    delete userData.otp
    return await userDao.createUserService(userData);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
};