const { checkSchema } = require('express-validator')
const { ObjectId } = require('mongodb');
const { fetchUserPhone } = require('../dao/user.dao');

const scoreSchema = checkSchema({
  score: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'Score is required.'
    },
    isInt: { // Corrected to isInt for numeric validation
      errorMessage: 'Score range in between 50 to 500 only.',
      options: { min: 50, max: 500 }
    }
  },
  userId: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'userId is required.'
    },
    custom: {
      options: async (value) => {
        return new ObjectId(value)
      }
    }
  }
})

const userSchema = checkSchema({
  name: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'name is required.'
    },
  },
  email: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'userId is required.'
    },
    custom: {
      options: async (value) => {
        return new ObjectId(value)
      }
    }
  },
  dob: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'dob is required.'
    },
  },
  phone: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'phone is required.'
    }
  }
})

module.exports = {
  scoreSchema,
  userSchema
}