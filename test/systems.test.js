const async = require('async');
const client = require('./client');
const fixtures = require('./fixtures/systems');
const server = require('./server');
const test = require('tap').test;

function end (test) {
  return function () {
    test.end();
  }
}

test('Creating systems', function (t) {
  server
    .postAndReturn('/systems', fixtures.creationSuccessResponse)
    .postAndReturn('/systems', fixtures.creationDuplicateResponse, 409)
    .postAndReturn('/systems', fixtures.creationErrorResponse, 400);

  async.series([
    function (done) {
      client.createSystem(fixtures.testSystem, function (err, status) {
        t.notOk(err, 'No error was raised when creating system');
        t.same(status, 'created', 'System was successfully created');
        done();
      });
    },
    function (done) {
      client.createSystem(fixtures.testSystem, function (err, status) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when creating duplicate system');
        t.notOk(status, 'Nothing should be returned');
        done();
      });
    },
    function (done) {
      client.createSystem(fixtures.badSystem, function (err, status) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when creating bad system');
        t.notOk(status, 'Nothing should be returned');
        done();
      });
    }
  ], end(t));
});

test('Getting systems', function (t) {
  server
    .getAndReturn('/systems', fixtures.getResponse)
    .getAndReturn('/systems/test-system', fixtures.getSingleResponse)
    .getAndReturn('/systems/test-system', fixtures.getSingleResponse)
    .getAndReturn('/systems/missing-system', fixtures.notFoundResponse, 404);

  async.series([
    function (done) {
      client.getSystems(function (err, systems) {
        t.notOk(err, 'No error was raised when getting systems');
        t.same(systems.length, 1, 'Correct number of systems returned');
        done();
      });
    },
    function (done) {
      client.getSystem(fixtures.testSystem.slug, function (err, system) {
        t.notOk(err, 'No error was raised when getting system from slug');
        t.ok(system, 'A system was returned');
        t.same(system.slug, 'test-system', 'Appropriate system was returned');
        done();
      });
    },
    function (done) {
      client.getSystem(fixtures.testSystem, function (err, system) {
        t.notOk(err, 'No error was raised when getting system');
        t.ok(system, 'A system was returned');
        t.same(system.slug, 'test-system', 'Appropriate system was returned');
        done();
      });
    },
    function (done) {
      client.getSystem(fixtures.missingSystem, function (err, system) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when getting non-existent system');
        t.notOk(system, 'No system should be returned');
        done();
      });
    }
  ], end(t));
});

