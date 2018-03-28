var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);

/*
var mongoose = require('mongoose');
var Hash = require('password-hash');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    set: function(newValue) {
      return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
    },
    required: true
  },
  passwordConf: {
    type: String,
    set: function(newValue) {
      return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
    },
    required: true
  }
});


UserSchema.statics.authenticate = function(email, password, callback) {
  this.findOne({ email: email }, function(error, user) {
    if (user && Hash.verify(password, user.password)) {
      callback(null, user);
    } else if (user || !error) {
      // Email or password was invalid (no MongoDB error)
      error = new Error("Your email address or password is invalid. Please try again.");
      callback(error, null);
    } else {
      // Something bad happened with MongoDB. You shouldn't run into this often.
      callback(error, null);
    }
  });
};

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);

module.exports = User;
*/
