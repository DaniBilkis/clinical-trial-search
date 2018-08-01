var mongoose = require('mongoose');
var passport = require("passport");
//var bcrypt = require('bcrypt');
var userSchema = mongoose.model('User');


var userController = {};

var sendJsonResponse = function ( res, status, content ) {
  res.status( status );
  res.json( content );
};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('index', { user : req.user });
};

// Go to registration page
userController.register = function(req, res) {
  res.render('register');
};

// Post registration
userController.doRegister = function(req, res) {
  userSchema.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

// Go to login page
userController.login = function(req, res) {
  res.render('login');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};


userController.userCreate = function(req, res) {
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    };

    //use schema.create to insert data into the db
    userSchema.create( userData, function (err, user) {
      if (err) {
        //return next(err)
        sendJsonResponse(res, 400, err);
      } else {
        //return res.redirect('/profile');
        sendJsonResponse(res, 201, location);
      }
    });
  }
};

module.exports = userController;

