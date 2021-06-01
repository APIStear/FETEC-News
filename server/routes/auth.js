const express = require('express'),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      authCtr = require('../controllers/auth');

router.post("/google", aHandler(authCtr.googleAuth()));

router.post("/admin", aHandler(authCtr.adminAuth()));

module.exports = router;