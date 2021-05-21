// .env configuration
require('dotenv').config()

const express = require('express'),
      app = express(),
      cors = require('cors'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      path = require('path'),
      eHandler = require('./middleware/errorHandler'),
      sendAsJSON = require('./middleware/sendAsJson'),
      PORT = process.env.PORT || 4000;

// DB Setup
require('./config/dbConfig');

// Routes
const eventRoutes = require('./routes/event');
const authRoutes = require('./routes/auth');

app.use(logger('dev'));
app.use(cors());

app.use((req, res, next) => express.json()(req, res, next));
// app.use( bodyParser.urlencoded({extended: true}))

// Serves build
app.use(express.static(path.resolve('./client/build')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Redirects everything else to index
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./client/build/index.html'));
});

app.get('/*', (req,res) => {
  res.sendFile(path.resolve('./client/build/index.html'));
})

// Erro handlers
app.use(eHandler());
app.use(sendAsJSON());

app.listen(PORT, _ => {
  // adminConfig()
  // .then(_ => {
  console.log('Server up and running on port ' + PORT)
  // });
});
