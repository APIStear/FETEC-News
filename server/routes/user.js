const express = require('express'),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      userCtr = require('../controllers/user');

router.get('/',
  aHandler(userCtr.getAll()),
);

router.get('/:studentId',
  aHandler(userCtr.getOne()),
);

router.post('/',
  aHandler(userCtr.create()),
);

router.put('/:studentId',
  aHandler(userCtr.edit()),
);

router.delete('/:studentId',
  aHandler(userCtr.delete()),
);

module.exports = router;
