const express = require('express');
const app = express();
const cors = require('cors');

app.use(require('cookie-parser')());
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/game', require('./routes/game'));
app.use('/api/v1/bets', require('./routes/bets'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
