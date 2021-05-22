const express = require('express'),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      authCtr = require('../controllers/auth');

router.post("/google", aHandler(authCtr.googleAuth()));

module.exports = router;