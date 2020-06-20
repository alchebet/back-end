const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  bettor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  guess: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Bet', schema);
