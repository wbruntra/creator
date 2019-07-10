const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
var createError = require('http-errors');
var express = require('express');
var cookieSession = require('cookie-session');
var logger = require('morgan');

var indexRouter = require('./routes/api');
var googleRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: 'creator-app',
    keys: [process.env.SESSION_KEY],
    maxAge: 30 * 24 * 60 * 60 * 1000, //one month
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/google', googleRouter);
app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    error: res.locals.error,
    message: res.locals.message,
  });
});

module.exports = app;
