const { Router } = require('express');
const User = require('../models/User.js');
const ensureAuth = require('../middleware/ensureAuth');

const setCookie = (user, res) => {
  res.cookie('session', user.authToken(), {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly:true
  });
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        setCookie(user, res);
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    User
      .authorize(req.body)
      .then(user => {
        setCookie(user, res);
        res.send(user);
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  })

  .get('/logout', (req, res) => {
    res.clearCookie('session');
    res.send({ message: 'logout successful' });
  });
