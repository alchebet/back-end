const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Game = require('../models/Game');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Game
      .create({ ...req.body, creator: req.user._id })
      .then(game => res.send(game))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Game
      .find(req.query)
      .populate('winners guess')
      .then(games => res.send(games))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Game
      .findById(req.params.id)
      .populate('winners')
      .populate({ path: 'guess', populate: { path: 'bettor', select: 'displayName' } })
      .then(game => res.send(game))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Game
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(game => res.send(game))
      .catch(next);
  });
