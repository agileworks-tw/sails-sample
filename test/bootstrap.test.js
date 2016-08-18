var Sails = require('sails');
var rc = require("rc");

global.request = require("supertest-as-promised");
global.should = require("chai").should();
global.sinon = require("sinon");

before(function(done) {
  var config = rc('sails');
  config.environment = 'test';

  Sails.lift(config, function(err, server) {
    sails = server;
    if (err) return done(err);
    done(err, server);
  });
});

after(function(done) {
  sails.lower(done());
});
