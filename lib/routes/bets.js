const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Bet = require('../models/Bet');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Bet
      .create({ ...req.body, bettor: req.user._id })
      .then(bet => res.send(bet))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Bet
      .find({ bettor: req.user._id })
      .then(bets => res.send(bets))
      .catch(next);
  });
