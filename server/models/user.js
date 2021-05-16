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
  }
});

// Custom validation
userSchema.path('studentID').validate(function (value) {
  re = /^[AL]0[0-9]{7}$/;
  return re.test(v);
}, 
"La matrícula debe cumplir con el formato completo. [A0.......]."
);

module.exports = mongoose.Model('User', userSchema);
