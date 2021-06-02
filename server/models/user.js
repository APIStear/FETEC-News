const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      MyError = require('./MyError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nombre es requerido"],
  },
  profilePicture: {
    type: String,
  },
  studentId:{
    type: String,
    required: [true, "Matrícula es requerida"],
    match: [
      /^[AL]0[0-9]{7}$/,
      "La matrícula debe cumplir con el formato completo. [A0.......].",
    ],
  },
  email: {
    type: String,
    required: [true, "Correo es requerido"],
  },
  gender: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro', ''],
    default: ''
  },
  careerProgram: {
    type: String,
    default: ''
  },
  semester: {
    type: Number,
    default: 1
  },
  schoolProgram: {
    type: String,
    default: ''
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
  }
});

userSchema.path('email').validate(async function(value){
  const emailCount =await mongoose.models.User.countDocuments({email: value, _id: { $ne: this._id  } });
  return !emailCount;
}, 'El correo {VALUE} ya fue utilizado.');

userSchema.statics.updateUser = async function(userId, studentId, name, mail, gender, careerProgram, semester, isTec21, schoolProgram, numRSVPs) {  
  const user = await this.findOneAndUpdate(
    {_id: userId, bActive: true},
    {
      studentId,
      name,
      mail,
      gender,
      careerProgram,
      semester,
      isTec21,
      schoolProgram,
      numRSVPs
    },
    {new: true}
  ).exec();

  if(!user) {
    return Promise.reject(new MyError(404, "No se encontró el usuario."));
  }

  return user;
}

userSchema.statics.deleteUser = async function(userId) {
  const user = await this.findOneAndUpdate(
    {_id: userId, bActive: true},
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
    _id: studentId,
    bActive: true,
  }).exec();

  if(!user) {
    return Promise.reject(new MyError(404, "No se encontró el usuario."));
  }

  return user;
}

userSchema.statics.getByEmail = async function(email) {
  const user = await this.findOne({
    email: email,
    bActive: true,
  }).exec();

  return user
}

userSchema.methods.generateToken = function() {
  const user = this;
  const token = jwt.sign({_id: user._id.toString() }, process.env.JWT_SECRET);
  return token;
}

module.exports = mongoose.model('User', userSchema);
