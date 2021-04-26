const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override')

const app = express();

const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

// CONFIGURATE PASSPORT
const initializePassport = require('./utils/passport-config');

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 2) MIDDLEWARES
app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));


// 3) ROUTES
app.get('/create', (req, res) => {
  res.status(200).render('partials/createProject.ejs');
})

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);

module.exports = app;