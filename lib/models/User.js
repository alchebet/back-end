const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

schema.virtual('password').set(function(password) {
  return this.passwordHash = bcrypt.hashSync(password, process.env.SALT_ROUNDS || 10);
});

schema.statics.authorize = function({ username, password }) {
  return this.findOne({ username })
    .then(user => {
      if(!user) {
        const err = new Error('Invalid Username/Password');
        err.status = 401;
        throw err;
      }

      if(bcrypt.compareSync(password, user.passwordHash)) {
        const err = new Error('Invalid Username/Password');
        err.status = 401;
        throw err;
      }

      return user;
    });
};

schema.statics.verifyToken = function(token) {
  const { sub } = jwt.verify(token, process.env.APP_SECRET);
  return this.hydrate(sub);
};

schema.methods.authToken = function() {
  return jwt.sign({ sub: this.toJSON() }, process.env.APP_SECRET, { expiresIn: '24h' });
};

module.exports = mongoose.model('User', schema);
