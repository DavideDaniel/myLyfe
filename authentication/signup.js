// /authentication/signup.js
const MyLyfeStrategy = require('passport-local')
  .Strategy;
const User = require('../models/user');
const bCrypt = require('bcrypt-nodejs');
module.exports = (passport) => {
  const createPassword = function gen(user, password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync[10], null);
  };
  passport.use('signup', new MyLyfeStrategy({
    passReqToCallback: true,
  },
 (req, userEmail, password, done) => {
   const findOrCreate = () => {
     User.findOne({
       email: userEmail,
     }, (err, user) => {
       // if error
       if (err) {
        //  console.log('Error in our signup route : ' + err);
         done(err);
       }
       // if user exists
       if (user) {
         done(null, false, req.flash('message', 'User Exists'));
       } else {
         const newUser = new User();
         newUser.email = userEmail;
         newUser.firstName = req.param('firstName');
         newUser.lastName = req.param('lastName');
         newUser.password = createPassword(password);
         newUser.save((error) => {
           if (error) {
              // console.log('Error while creating', error);
             throw error;
           }
          // console.log('Successfully registered user', newUser.email);
           done(null, newUser);
         }); // end our newUser.save
       }
     });
   };
   return process.nextTick(findOrCreate);
 })); // closing Strategy // closing passport.use
};
