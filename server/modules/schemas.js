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

/*
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
*/
UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);

module.exports = User;
