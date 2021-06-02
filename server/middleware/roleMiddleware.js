const jwt = require('jsonwebtoken');
const MyError = require('../models/MyError');
const User = require('../models/user');
const mw = {};

// TODO: Add admin validation
mw.isLoggedIn = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return next();
  }
  const data = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
  const user = await User.findById(data._id).exec();

  if (user) {
    req.user = user;
    next();
  } else {
    return Promise.reject(new MyError(401, 'Debes iniciar sesión para hacer eso.'));
  }
};

mw.isAdmin = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return Promise.reject(new MyError(401, 'Debes iniciar sesión para ahacer eso.'));
  }
  const data = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
  if (data.admin === process.env.ADMIN_PW) {
    next();
  } else return Promise.reject( new MyError(403,
    'No tienes permiso de hacer eso.')); 
}

// TODO: Add admin validation
mw.isOwnerOrAdmin = async (req, res, next) =>{
  const token = req.headers['authorization'];
  if (!token) {
    return Promise.reject(new MyError(401, 'Debes iniciar sesión para ahacer eso.'));
  }
  const data = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
  const user = await User.findById(data._id).select('+role +tokens').exec();

  if (user && user._id == req.params.userId) {
    return next();
  } else if (user) {
    return Promise.reject( new MyError(403,
        'No tienes permiso de hacer eso.'));
  } else {
    return Promise.reject( new MyError(404,
        'No se encontró el usuario.'));
  }
};


module.exports = mw;