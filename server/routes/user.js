const express = require('express'),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      userCtr = require('../controllers/user');

router.get('/',
  aHandler(userCtr.getAll()),
);

router.get('/:userId',
  aHandler(userCtr.getOne()),
);

router.post('/',
  aHandler(userCtr.create()),
);

router.put('/:userId',
  aHandler(userCtr.edit()),
);

router.delete('/:userId',
  aHandler(userCtr.delete()),
);

module.exports = router;
