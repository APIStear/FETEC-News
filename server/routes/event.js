const express = require('express'),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      {isOwnerOrAdmin} = require('../middleware/roleMiddleware'),
      eventCtr = require('../controllers/event');

router.get('/', 
  aHandler(eventCtr.getAll()),
);

router.get('/:eventId', 
  aHandler(eventCtr.getOne()),
);


router.post('/', 
  aHandler(eventCtr.create()),
);


router.put('/:eventId', 
  aHandler(eventCtr.edit()),
);

router.delete('/:eventId', 
  aHandler(eventCtr.delete()),
);

router.get('/:eventId/users/:userId',
  aHandler(isOwnerOrAdmin),
  aHandler(eventCtr.checkIfRSVPed())
);

router.post('/:eventId/users/:userId',
  aHandler(eventCtr.rsvp()),
);

module.exports = router;
