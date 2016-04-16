const router = require('express').Router;

const authenticated = function auth(req, res, next) {
  if (req.authenticate()) {
    return next();
  }
  return res.redirect('/');
};

module.exports = (passport) => {
  router.get('/', (req, res) => {
    res.render('index', {
      message: req.flash('something went wrong...'),
    });
  });
  router.post('login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true,
  }));
  router.get('/signup', (req, res) => {
    res.render('register', {
      message: req.flash('message'),
    });
  });
  router.post('signup', passport.authenticate('signup', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true,
  }));
  router.get('profile', authenticated, (req, res) => {
    res.render('profile', {
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
