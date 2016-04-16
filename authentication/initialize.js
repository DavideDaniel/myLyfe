const login = require('./login');
const signup = require('./signup');
const User = require('../models/user');
module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    // console.log('serializing :', user);
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      if (err) {
        throw err;
      }
      // console.log('deserializing :', user);
      done(err, user);
    });
  });
  login(passport);
  signup(passport);
};
