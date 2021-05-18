const mongoose = require('mongoose'),
      MyError = require('./MyError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nombre es requerido"],
  },
  studentId:{
    type: String,
    required: [true, "Matrícula es requerida"],
  },
  mail: {
    type: String,
    required: [true, "Correo es requerido"],
  },
  gender: {
    type: String
  },
  careerProgram: {
    type: String,
    required: [true, "Carrera es requerida"],
  },
  semester: {
    type: Number,
    requred: [true, "Semestre es requerido"],
  },
  isTec21: {
    type: Boolean,
  },
  schoolProgram: {
    type: String
  },
  numRSVPs: {
    type: Number,
    default: 0,
  },
  // used to logically delete data, DO NOT EXPOSE OUTSIDE OF BACKEND
  bActive: {
    type: Boolean,
    default: true,
    // by default, it will not be shown in document, unless selected
    select: false,
  },
});

// Custom validation
userSchema.path('studentID').validate(function (value) {
  re = /^[AL]0[0-9]{7}$/;
  return re.test(v);
}, 
"La matrícula debe cumplir con el formato completo. [A0.......]."
);

userSchema.statics.updateUser = async function(studentId, name, mail, gender, careerProgram, semester, isTec21, schoolProgram, numRSVPs) {
  const user = await this.findOneAndUpdate(
    {_id: studentId, bActive: true},
    {
      name,
      mail,
      gender,
      careerProgram,
      semester,
      isTec21,
      schoolProgram,
    },
    {new: true}
  ).exec();

  if(!user) {
    return Promise.reject(new MyError(404, "No se encontró el usuario."));
  }

  return user;
}

userSchema.statics.deleteUser = async function(studentId) {
  const user = await this.findOneAndUpdate(
    {_id: studentId, bActive: true},
    {bActive: false},
    {new: true}
  ).exec()

  if(!user) {
    return Promise.reject(new MyError(404, "No se encontró el usuario."));
  }

  return user;
}

userSchema.statics.getAll = async function(page, pageSize) {
  const query = {bActive: true};

  const [users, total] = await Promise.all([
    this.find(query)
      .skip(page * pageSize)
      .limit(pageSize)
      .exec(),
    this.countDocuments(query),
  ]);

  return {users, total, totalPages: Math.ceil(total / pageSize)};
}

userSchema.statics.getOne = async function(studentId) {
  const user = await this.findOne({
    __id: studentId,
    bActive: true,
  }).exec();

  if(!user) {
    return Promise.reject(new MyError(404, "No se encontró el usuario."));
  }

  return user;
}

module.exports = mongoose.Model('User', userSchema);
