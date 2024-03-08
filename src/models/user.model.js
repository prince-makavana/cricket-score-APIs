const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  }
})

const User = mongoose.model('users', userSchema)
module.exports = User
