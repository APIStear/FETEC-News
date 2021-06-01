const mongoose = require('mongoose'),
      User = require('./user'),
      MyError = require('./MyError');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Título es requerido"],
  },
  // Asociation or student group organizing the event
  studentGroup: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Descripción es requerida"],
  },
  startDate: {
    type: Date,
    required: [true, "Fecha de inicio es requerida"],
  },
  imgKeys: {
    type: [String],
  },
  endDate: {
    type: Date,
  },
  location: {
    type: String,
  },
  // Know if this event is RSVPable
  isRSVP: {
    type: Boolean,
  },
  // list of user ids of users who have RSVPed
  RSVPlist: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    select: false,
  },
  // used to logically delete data, DO NOT EXPOSE OUTSIDE OF BACKEND
  bActive: {
    type: Boolean,
    default: true,
    // by default, it will not be shown in document, unless selected
    select: false,
  }
});

// DO NOT USE ARROW FUNCTIONS HERE
// using arrow function (() => {}) does not allow the use of 'this'
eventSchema.statics.updateEvent = async function(eventId, title, description, startDate, endDate, location, isRSVP) {
  const event = await this.findOneAndUpdate(
    {_id: eventId, bActive: true},
    {
      title,
      description,
      startDate,
      endDate,
      location,
      isRSVP,
    },
    {new: true}
  ).exec();
  
  if(!event) {
    return Promise.reject(new MyError(404, "No se encontró el evento."));
  }
  return event;
}

eventSchema.statics.deleteEvent = async function(eventId){
  const event = await this.findOneAndUpdate(
    {_id: eventId, bActive: true},
    {bActive: false},
    {new: true}
  ).exec()

  if(!event) {
    return Promise.reject(new MyError(404, "No se encontró el evento."));
  }
  return event;
}

eventSchema.statics.getAll = async function(page, pageSize, startDate, endDate, title) {
  const query = {bActive: true};

  if(title && title.length > 0){
    query.title = new RegExp(title, 'i');
  }

  if (startDate || endDate) {
    query.startDate = {}
    if (startDate) {
      query.startDate.$gte = startDate
    }
    if (endDate) {
      query.startDate.$lte = endDate
    }
  }

  const [events, total] = await Promise.all([
    this.find(query)
      .skip(page*pageSize)
      .limit(pageSize)
      .exec(),
    this.countDocuments(query),
  ]);


  return {events, total, totalPages: Math.ceil(total/pageSize)}; 
}

eventSchema.statics.getOne = async function(eventId){
  const event = await this.findOne({
    _id: eventId,
    bActive: true,
  }).exec();
  if(!event) {
    return Promise.reject(new MyError(404, "No se encontró el evento."))
  }
  return event
}

eventSchema.statics.checkIfRSVPed = async function(eventId, userId) {
  const event = await this.findOne({
    _id: eventId,
    bActive:true,
  }).select('+RSVPlist').exec()
  const user = await User.getOne(userId);

  if(!event) {
    return Promise.reject(new MyError(404, "No se encontró el evento"));
  }
  const RSVPed = event.RSVPlist.includes(userId);

  return RSVPed;
}

eventSchema.statics.reserveEvent = async function(eventId, userId) {
  const user = await User.getOne(userId);

  if(!user) {
    return Promise.reject(new MyError(404, "No se encontró el usuario."));
  }

  const event = await this.findOne({
    _id: eventId,
    bActive: true,
  }).select('+RSVPlist').exec();
 
  if(!event) {
    return Promise.reject(new MyError(404, "No se encontró el evento."));
  }

  if(event.RSVPlist.includes(userId)) {
    return Promise.reject(new MyError(404, "El usuario ya reservó el evento."));
  } 

  user.numRSVPs = user.numRSVPs + 1;
  event.RSVPlist.push(user._id);

  await Promise.all([user.save(), event.save()])
  return true;
}

module.exports = mongoose.model('Event', eventSchema);
