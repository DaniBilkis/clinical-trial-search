var mongoose = require( 'mongoose' );
//var assert = require('assert');

var dbURI = 'mongodb://localhost/clinical_trial';
if (process.env.NODE_ENV === 'production') {
    dbURI = 'mongodb://loc8r:loc8r!@ds251245.mlab.com:51245/heroku_dbvpcntq';
}

mongoose.connect( dbURI );

mongoose.connection.on( 'connected', function() {
    console.log( 'Mongoose Connected to ' + dbURI );
});

mongoose.connection.on( 'error', function( err ) {
    console.log( 'Mongoose Connection Error ' + err );
});

mongoose.connection.on( 'disconnected', function() {
    console.log( 'Mongoose Disconnected' );
});

var gracefulShutdown = function( msg, callback ) {
    mongoose.connection.close( function() {
        console.log( 'Mongoose disconnected through ' + msg );
        callback();
    });
};

process.once( 'SIGUSR2', function () {
    gracefulShutdown( 'nodemon restart', function() {
        process.kill( process.pid, 'SIGUSR2' );
    });
});

process.on( 'SIGINT', function () {
    gracefulShutdown( 'app termination', function() {
        process.exit(0);
    });
});

process.on( 'SIGTERM', function () {
    gracefulShutdown( 'Heroku app termination', function() {
        process.exit(0);
    });
});

//mongoose.connect(dbURI);

require('./schemas');
