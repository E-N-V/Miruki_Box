const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dev = false;

//Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/test');
const adminDBRouter = require('./routes/adminDBRouter');
const certificateRouter = require('./routes/certificateRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/olympList', testRouter);
app.use('/dbAdmin', adminDBRouter);
app.use('/certificate', certificateRouter);

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
  if (!dev) {
    let rnd = Math.floor(Math.random() * ( 5 - 1 ) + 1);
    switch (rnd) {
      case 1: res.status(404).render('404/demo1');
        break;
      case 2: res.status(404).render('404/demo2');
        break;
      case 3: res.status(404).render('404/demo3');
        break;
      case 4: res.status(404).render('404/demo4');
        break;
    }
  }else res.render('404/error');
});

module.exports = app;
