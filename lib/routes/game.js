const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router()
  .post('/', (req, res, next) => {
    Game
      .create(req.body)
      .then(game => res.send(game))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Game
      .find({ creator: req.user._id })
      .then(games => res.send(games))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Game
      .findById(req.params.id)
      .then(game => res.send(game))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Game
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(game => res.send(game))
      .catch(next);
  });
