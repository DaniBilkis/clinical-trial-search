var express = require( 'express' );
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');


var ctrlSearch = require( '../controllers/search' );
var login = require( '../controllers/mongo-queries' );
//var ctrlReviews = require( '../controllers/reviews' );

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


/* Location Pages */

router.get( '/ping', ctrlSearch.pingElastic );
router.get( '/search/:searchedParameter', ctrlSearch.searchSomething );

//router.post( '/locations', ctrlLocations.locationsCreate );
//router.get( '/locations/:locationid', ctrlLocations.locationReadOne );
//router.put( '/locations/:locationid', ctrlLocations.locationsUpdateOne );
//router.delete( '/locations/:locationid', ctrlLocations.locationsDeleteOne );

// restrict index for logged in user only
router.get('/', login.home);

// route to register page
router.get('/register', login.register);

// route for register action
// router.post('/register', login.doRegister);

// route to login page
router.get('/login', login.login);

// route for login action
router.post('/login', login.doLogin);

// route for logout action
router.get('/logout', login.logout);


/* Login */
// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});


//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

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

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

router.get( '/*', ctrlSearch.pageNotFound );

module.exports = router;



/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});
*/
//module.exports = router;
