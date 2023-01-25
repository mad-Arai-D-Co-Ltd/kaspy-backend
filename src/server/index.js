const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const api = require('../routes');
const Logger = require('../utils/logger.js');
const logger = new Logger();

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(compression());
app.use(cors({ credentials: true, origin: true, exposedHeaders: '*' }));

// Default
app.get('/', (req, res) => {
  res.send('OK');
});

// Api
app.use(api);

// db connection
app.set('db', require('../models/index'));

app.use((req, res, next) => {
  logger.log(
    'the url you are trying to reach is not hosted on our server',
    'error'
  );
  const err = new Error('Not Found');
  err.status = 404;
  res.status(err.status).json({
    type: 'error',
    message: 'the url you are trying to reach is not hosted on our server',
  });
  next(err);
});

module.exports = app;
