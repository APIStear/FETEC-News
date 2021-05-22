const ctr = {},
      User = require('../models/user'),
      { OAuth2Client } = require('google-auth-library'),
      client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

ctr.googleAuth = () => async (req, res, next) => {
  const {token} = req.body;
  console.log('token :>> ', token);
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

module.exports = ctr;