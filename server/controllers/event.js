const Event = require('../models/event'),
      ctr = {};

ctr.create = () => async (req, res, next) => {
  const {
    title, 
    description,
    startDate,
    endDate,
    location, 
    isRSVP
  } = req.body;

  const event = new Event({
    title,
    description,
    startDate,
    endDate,
    location,
    isRSVP
  });

  await event.save();
  
  return res.status(200).json({event});
}

ctr.edit = () => async (req, res, next) => {
  const {eventId} = req.params;
  const {
    title, 
    description,
    startDate,
    endDate,
    location, 
    isRSVP
  } = req.body;
  
  const event = await Event.updateEvent(
    eventId,
    title,
    description,
    startDate,
    endDate,
    location,
    isRSVP,
  );

  return res.status(200).json({event});
}


ctr.delete = () => async (req, res, next) => {
  const {eventId} = req.params;

  const event = await Event.deleteEvent(eventId);

  return res.status(200).json({event});
}

ctr.getAll = () => async (req, res, next) => {
  // page & page size for pagination
  // all else is for filters
  let {startDate, endDate, title, page, pageSize} = req.query;
  
  // Check for nonintegers
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;

  // Check non positive
  page = page > 1 ? page: 1;
  pageSize = pageSize > 0 ? pageSize : 10;

  // starts on 0
  currentPage = page-1;

  const data = await Event.getAll(currentPage, pageSize, startDate, endDate, title);

  return res.status(200).json(data);
}

ctr.getOne = () => async (req, res, next) => {
  const {eventId} = req.params;
  const event = await Event.getOne(eventId);

  return res.status(200).json({event});
}

ctr.checkIfRSVPed = () => async (req, res, next) => {
  const {eventId, userId} = req.params;

  const RSVPed = await Event.checkIfRSVPed(eventId, userId);

  return res.status(200).json({RSVPed});
}

ctr.rsvp = () => async (req, res, next) => {
  const {
    eventId,
    userId,
  } = req.params;

  const RSVPed = await Event.reserveEvent(
    eventId,
    userId,
  );

  return res.status(200).json({RSVPed});
}

module.exports = ctr;
