const express = require('express'),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      eventCtr = require('../controllers/event');
