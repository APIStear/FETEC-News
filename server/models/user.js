const mongoose = require('mongoose'),
      MyError = require('./MyError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nombre es requerido"],
  },
  // matricula
  // TODO: validation A00000000
  studentId:{
    type: String,
    required: [true, "Matrícula es requerida"],
  },
  role: {
    type: Number,
    default: 0,
    // 0 = normal user, 99 = admin
    enum: [0,99],
  }
});


module.exports = mongoose.Model('User', userSchema);