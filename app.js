const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override')

const app = express();

const User = require('./models/userModel');
const initializePassport = require('./passport-config');

initializePassport(
  passport,
  
  username => User.findOne({ username: username }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return data;
    }
  }),

  id => User.findOne({ _id: id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return data;
    }
  }) 
)


app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));


app.get('/app', checkAuthenticated, (req, res) => {
  res.render('app.ejs', { username: req.user.username });
})

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
})

app.post('/register', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    await user.save();
    console.log('New User Created');
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.redirect('/register');
  }
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/app',
  failureRedirect: '/login',
  failureFlash: true
  }
))

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/app');
  }
  next();
}

module.exports = app;