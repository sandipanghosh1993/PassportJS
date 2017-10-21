const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
  //user has already had their email and password auth'd
  //we just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  if( !email || !password ) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  //see if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {

    if(err) { return next(err); }

    //if a user with does exit, retrun an Error
    if(existingUser) {
      console.log("Email is in use");
      return res.status(422).send({ error: 'Email is in use' });
    }

    //if a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save((err) => {
      if(err) { return next(err); }

      //respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}
