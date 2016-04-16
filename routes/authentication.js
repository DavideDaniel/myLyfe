const router = require('express').Router();

const authenticated = function auth(req, res, next) {
  if (req.authenticated()) {
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
  router.post('login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  }));
  router.get('/signup', (req, res) => {
    res.render('index.ejs', {
      message: req.flash('message'),
    });
  });
  router.post('signup', passport.authenticate('signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  }));
  router.get('/profile', authenticated, (req, res) => {
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
