const ctr = {},
      User = require('../models/user'),
      { OAuth2Client } = require('google-auth-library'),
      jwt = require('jsonwebtoken'),
      MyError = require('../models/MyError'),
      client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

ctr.googleAuth = () => async (req, res, next) => {
  const {token} = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });
  const payload = ticket.getPayload();    
  const { name, email, picture } = payload; 
  let user = await User.getByEmail(email);
  let firstLogin = false;
  if(!user) {
    firstLogin = true;
    user = await User({ 
        email: email,
        name: name,
        // Takes studentId from email
        studentId: email.substr(0, email.lastIndexOf("@")).toUpperCase()
    })
    await user.save();
  }

  const jwtToken = user.generateToken();
  return res.status(201).json({user, firstLogin, token: jwtToken});
}

ctr.adminAuth = () => async (req, res, next) => {
  const {password} = req.body;

  if(password !== process.env.ADMIN_PW) {
    return Promise.reject(new MyError(400, "Contraseña incorrecta"));
  }
  
  const token = jwt.sign({admin: process.env.ADMIN_PW}, process.env.JWT_SECRET);
  return res.status(200).json({token});
}

module.exports = ctr;