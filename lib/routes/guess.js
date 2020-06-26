const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Guess = require('../models/Guess');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Guess
      .create({ ...req.body, bettor: req.user._id })
      .then(guess => res.send(guess))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Guess
      .find({ bettor: req.user._id })
      .then(guess => res.send(guess))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Guess
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(guess => res.send(guess))
      .catch(next);
  });
