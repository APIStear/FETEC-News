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
userSchema.path('studentId').validate(function (value) {
  re = /^[ALal]0[0-9]{7}$/;
  return re.test(value);
}, 
"La matrícula debe cumplir con el formato completo. [A0.......]."
);

module.exports = mongoose.model('User', userSchema);
