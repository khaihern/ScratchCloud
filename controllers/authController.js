const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/userModel');

exports.register = async (req, res, next) => {
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
}

exports.login = passport.authenticate('local', {
  successRedirect: '/app',
  failureRedirect: '/login',
  failureFlash: true
})

exports.logout = (req, res) => {
  req.logOut();
  res.status(200).json({ status: 'success' });
}

exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(200).redirect('/login');
}

exports.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).redirect('/app');
  }
  next();
}

