const userModel = require('../models/user.model')

const createUserService = async (userDetails) => {
    try {
        const user = new userModel(userDetails)
        return await user.save()
    } catch (error) {
        throw error
    }
}

const fetchUserPhone = async (phone) => {
    try {
        return await userModel.find({phone})
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUserService,
    fetchUserPhone
}