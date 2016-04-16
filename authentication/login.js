const MyLyfeStrategy = require('passport-local')
  .Strategy;
const User = require('../models/user');
const bCrypt = require('bcrypt-nodejs'); // we're gonna use bcrypt to do our encryption

module.exports = (passport) => {
  const validatePassword = (user, password) => bCrypt.compareSync(password, user.password);

  passport.use('login', new MyLyfeStrategy({
    passReqToCallback: true,
  },
  (req, userEmail, password, done) => {
    User.findOne({
      email: userEmail,
    }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!userEmail) {
        return done(null, false, req.flash('message', 'Email Not Found'));
      }
      if (!validatePassword(user, password)) {
        return done(null, false, req.flash('message', 'Password/Email does not match.'));
      }
      return done(null, user);
    });
  }));
};
