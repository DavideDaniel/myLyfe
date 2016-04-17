const router = require('express').Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

module.exports = (passport) => {
  router.get('/', (req, res) => {
    // console.log('got a request');
    // res.send('index');
    res.render('index.ejs', {
      message: req.flash('message'),
    });
  });
  router.get('/login', (req, res) => {
    // console.log('got a request');
    // res.send('index');
    res.render('index.ejs', {
      message: req.flash('message'),
    });
  });
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  }));
  router.get('/signup', (req, res) => {
    res.render('signup.ejs', {
      message: req.flash('message'),
    });
  });
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  }));
  router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile.ejs', {
      user: req.user,
    });
  });
  router.get('/signout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  return router;
};
// end of authenticate.js
