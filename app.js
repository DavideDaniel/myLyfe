const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const mongoose = require('mongoose');
mongoose.connect(db.url);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);


const passport = require('passport');
const initPassport = require('./authentication/initialize');

const flash = require('connect-flash');
const routes = require('./routes/authentication.js')(passport);


mongoose.connection.on('error', () => {
  console.error(
    'MongoDB Connection Error. Please make sure that MongoDB is running.'
  );
});

// views related

app.use(favicon(__dirname + '/public/imgs/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport config
// session and secret

app.use(session({
  secret: 'something',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: new Date(Date.now() + 31000),
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// console.log(initPassport(passport));
initPassport(passport); // call our passport here


app.use('/', routes); // use our routes
// 404 and error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
