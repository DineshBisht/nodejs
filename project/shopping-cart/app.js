var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session   = require("express-session");
var flash = require('connect-flash');
var validator = require("express-validator");
mongoose.connect('mongodb://localhost:27017/shopping_cart',function(){
  console.log("Connected");
});

var routes         = require('./routes/index');
var categoryRoutes = require('./routes/category_routes');

var app = express();
app.use(flash());
app.use(validator());
// view engine setup
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views'),path.join(__dirname, 'views/partials/')]);


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(session({secret:"secretsuperstar"}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/category', categoryRoutes);
 
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
/* if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
} */

// production error handler
// no stacktraces leaked to user
/* app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
}); */


module.exports = app;