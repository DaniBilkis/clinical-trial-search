var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
require('./server/modules/db');
var userSchema = require('./server/modules/schemas');
var router = require('./server/routes/router');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

/// Settings
// Make JSON responses beautiful
app.set('json replacer', function(key, value){
  if (key === 'discount')
    return undefined;
  else
    return value;
});
app.set('json spaces', 4);

// disables the application root source
if ( 'production' === app.get('env') ) {
  app.disable('x-powered-by');
}

// Set a View Engine
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'false'
}));
app.use(cookieParser());

//app.use(mongo_db());

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// configure passport
passport.use(new LocalStrategy(userSchema.authenticate()));
passport.serializeUser(userSchema.serializeUser());
passport.deserializeUser(userSchema.deserializeUser());
//app.use(require('less-middleware')(path.join(__dirname, 'src')));
app.use( express.static(path.join(__dirname, 'dist')) );


// Set our api routes
app.use('/api', router);
app.use('/login', router);

// Catch all other routes and return the index file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
//app.all('*', router);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log( 'This looks like a ' + app.get('env') + ' environment to me...');
console.log( '__dirname of this project is: ' + __dirname );
console.log( 'X-Powered-By is ' + app.enabled('x-powered-by') );

module.exports = app;
