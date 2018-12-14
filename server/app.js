const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const { db } = require('./db');
const passport = require('passport');
const app = express();
const PORT = 3000;

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: 'This is not a very secure secret...',
    resave: false,
    saveUninitialized: false,
  })
);

// Session middleware
app.use(
  session({
    secret: 'This is not a very secure secret...',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// authentication router
app.use('/auth', require('./auth'));
app.use('/users', require('./users'));

// For all GET requests that aren't to an API route,
// we will send the index.html!
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

db.sync().then(() => {
  console.log('The database is synced!');
  app.listen(PORT, () =>
    console.log(`

      Listening on port ${PORT}
      http://localhost:3000/

    `)
  );
});
