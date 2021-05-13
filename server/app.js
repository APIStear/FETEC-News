// .env configuration
require('dotenv').config()

const express = require('express'),
      app = express(),
      cors = require('cors'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      path = require('path'),
      PORT = process.env.PORT || 4000;

// DB Setup
require('./config/dbConfig'),

app.use(logger('dev'));
app.use(cors());

app.use((req, res, next) => express.json()(req, res, next));

// Serves build
app.use(express.static(path.resolve('./client/build')));

// Routes

// Redirects everything else to index
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./client/build/index.html'));
});

app.get('/*', (req,res) => {
  res.sendFile(path.resolve('./client/build/index.html'));
})


app.listen(PORT, _ => {
  // adminConfig()
  // .then(_ => {
  console.log('Server up and running on port ' + PORT)
  // });
});