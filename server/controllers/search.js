const elastic = require('elasticsearch'),
        proxy = require('proxy-agent'),
       config = require('../../config/config.js');

let nodeAgent;

if(process.env.HTTP_PROXY) {
  console.log('Applying Proxy settings');
  nodeAgent = () => proxy(process.env.HTTP_PROXY);
}

const elasticClient = new elastic.Client({
  host:               config.elastic.host,
  log:                config.elastic.log,
  //suggestCompression: config.elastic.compression,
  //apiVersion:         config.elastic.apiVersion,
  createNodeAgent:    nodeAgent
});


//var elasticsearch = require('elasticsearch');

/*
var elasticClient = new elasticsearch.Client({
  host: '34.215.95.31:9200',
  log: 'trace'
});
*/
/*
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var theEarth = (function(){
  var earthRadius = 6371; // km, miles is 3959
  var getDistanceFromRads = function(rads) {
    return parseFloat(rads * earthRadius);
  };
  var getRadsFromDistance = function(distance) {
    console.log( 'Distance: ' + distance + '   ratio: ' + distance / earthRadius );
    return parseFloat(distance / earthRadius);
  };
  return {
    getDistanceFromRads : getDistanceFromRads,
    getRadsFromDistance : getRadsFromDistance
  };
})();
*/
var sendJsonResponse = function ( res, status, content ) {
  res.status( status );
  res.json( content );
};
/*
var doAddReview = function(req, res, location) {
  if (!location) {
    sendJsonResponse(res, 404, {
      "message": "locationid not found"
    });
  } else {
    location.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    location.save(function(err, location) {
      var thisReview;
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        updateAverageRating(location._id);
        thisReview = location.reviews[location.reviews.length - 1];
        sendJsonResponse(res, 201, thisReview);
      }
    });
  }
};
*/
module.exports.pingElastic = function( req, res ) {
  //elastic.getSuggestions(req.params.input).then(function (result) { res.json(result) });
  //elastic.getCountOfDocuments().then(function (result) { res.json(result) });
  //elastic.pingElastic().then(function (result) { res.json(result) });
  console.log('Trying to ping Elastic');

  elasticClient.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
  }, function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
      sendJsonResponse( res, 200, { "status" : "elasticsearch cluster is down or not reachable!" } );
    } else {
      console.log('All is well');
      sendJsonResponse( res, 200, { "status" : "All is well" } );
    }
  });
};


module.exports.searchSomething = function( req, res ) {
  //elastic.getSuggestions(req.params.input).then(function (result) { res.json(result) });
  //elastic.getCountOfDocuments().then(function (result) { res.json(result) });
  //elastic.pingElastic().then(function (result) { res.json(result) });
  console.log('1.Trying to search Elastic');
  if( req.params && req.params.searchedParameter ) {
    console.log('2.Before going to elasticsearch');
    elasticClient.search({
      index: 'clinical_trial',
      size: 100,
      _source: 'true',
      body: {
        query: {
          match: {
            body: 'message:' + req.params.searchedParameter
          }
        }
      }
      //q: 'message:' + req.params.searchedParameter
    }).then(function (body) {
      var hits = body.hits.hits;
      console.log('3.Elasticsearch response body - ' + body);
      console.log('4.Elasticsearch response hits - ' + body);
      sendJsonResponse(res, 200, hits);
    }, function (error) {
      console.trace(error.message);
    });
  } else {
    sendJsonResponse(res, 404, {
      message : 'No Location ID in Request'
    });
  }

};


module.exports.pageNotFound = function( req, res ) {
  //elastic.getSuggestions(req.params.input).then(function (result) { res.json(result) });
  //elastic.getCountOfDocuments().then(function (result) { res.json(result) });
  //elastic.pingElastic().then(function (result) { res.json(result) });
  console.log('Reached page not found');

  sendJsonResponse( res, 404, { "status" : "Page Not Found" } );
};


/*
module.exports.locationsCreate = function(req, res) {
  Loc.create({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(","),
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes: [{
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1,
    }, {
      days: req.body.days2,
      opening: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closed2,
    }]
  }, function(err, location) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, location);
    }
  });
};
*/
/*
module.exports.locationsCreate = function( req, res ) {
    sendJsonResponse( res, 200, { "status" : "success" } );
};
*/

/*
module.exports.locationsListByDistance = function(req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  console.log( 'Lng: ' + lng + '   Lat: ' + lat );
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    distanceMultiplier: 0.001,
    maxDistance: theEarth.getRadsFromDistance( req.query.maxDistance ),
    num: 10
  };
  if ((!lng && lng!==0) || (!lat && lat!==0)) {
    sendJsonResponse(res, 404, {
      "message": "lng and lat query parameters are required"
    });
    return;
  }
  Loc.geoNear(point, geoOptions, function ( err, results, stats ) {
    var locations = [];
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      results.forEach(function (doc) {
        locations.push({
          distance: theEarth.getDistanceFromRads(doc.dis),
          name: doc.obj.name,
          address: doc.obj.address,
          rating: doc.obj.rating,
          facilities: doc.obj.facilities,
          _id: doc.obj._id
        });
      });
      console.log('Number of locations returned from mongo: ' + locations.length);
      sendJsonResponse(res, 200, locations);
    }
  });
};
*/
/*
module.exports.locationsListByDistance = function( req, res ) {
    sendJsonResponse( res, 200, { "status" : "success" } );
};
*/

/*
module.exports.locationReadOne = function( req, res ) {
  if( req.params && req.params.locationid ) {
    Loc
      .findById( req.params.locationid )
      .exec( function( err, location ) {
        if ( !location ) {
          sendJsonResponse(res, 404, {
            message: 'Location ID Not Found'
          });
          return;
        } else if ( err ) {
          sendJsonResponse(res, 404, err );
          return;
        }
        sendJsonResponse( res, 200, location );
      });
  } else {
    sendJsonResponse(res, 404, {
      message : 'No Location ID in Request'
    });
  }
};

module.exports.locationsUpdateOne = function(req, res) {
  if (!req.params.locationid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid is required"
    });
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select('-reviews -rating')
    .exec(
      function(err, location) {
        if (!location) {
          sendJsonResponse(res, 404, {
            "message": "locationid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        location.name = req.body.name;
        location.address = req.body.address;
        location.facilities = req.body.facilities.split(",");
        location.coords = [parseFloat(req.body.lng),
          parseFloat(req.body.lat)];
        location.openingTimes = [{
          days: req.body.days1,
          opening: req.body.opening1,
          closing: req.body.closing1,
          closed: req.body.closed1,
        }, {
          days: req.body.days2,
          opening: req.body.opening2,
          closing: req.body.closing2,
          closed: req.body.closed2,
        }];
        location.save(function(err, location) {
          if (err) {
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 200, location);
          }
        });
      }
    );
};

module.exports.locationsDeleteOne = function(req, res) {
  var locationid = req.params.locationid;
  if (locationid) {
    Loc
      .findByIdAndRemove(locationid)
      .exec(
        function(err, location) {
          if (err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 204, null);
        }
      );
  } else {
    sendJsonResponse(res, 404, {
      "message": "No locationid"
    });
  }
};
*/
