const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  score: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
}, {
  timestamps: true
})

const Score = mongoose.model('score', scoreSchema)
module.exports = Score
