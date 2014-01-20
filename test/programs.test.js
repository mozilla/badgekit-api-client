const async = require('async');
const client = require('./client');
const fixtures = require('./fixtures/programs');
const server = require('./server');
const test = require('tap').test;

function end (test) {
  return function () {
    test.end();
  }
}

test('Creating programs', function (t) {
  server
    .postAndReturn('/programs', fixtures.creationSuccessResponse)
    .postAndReturn('/programs', fixtures.creationDuplicateResponse, 409)
    .postAndReturn('/programs', fixtures.creationErrorResponse, 400);

  async.series([
    function (done) {
      client.createProgram(fixtures.testProgram, function (err, status) {
        t.notOk(err, 'No error was raised when creating program');
        t.same(status, 'created', 'Program was successfully created');
        done();
      });
    },
    function (done) {
      client.createProgram(fixtures.testProgram, function (err, status) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when creating duplicate program');
        t.notOk(status, 'Nothing should be returned');
        done();
      });
    },
    function (done) {
      client.createProgram(fixtures.badProgram, function (err, status) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when creating bad program');
        t.notOk(status, 'Nothing should be returned');
        done();
      });
    }
  ], end(t));
});

test('Getting programs', function (t) {
  server
    .getAndReturn('/programs', fixtures.getResponse)
    .getAndReturn('/programs/test-program', fixtures.getSingleResponse)
    .getAndReturn('/programs/test-program', fixtures.getSingleResponse)
    .getAndReturn('/programs/missing-program', fixtures.notFoundResponse, 404);

  async.series([
    function (done) {
      client.getPrograms(function (err, programs) {
        t.notOk(err, 'No error was raised when getting programs');
        t.same(programs.length, 1, 'Correct number of programs returned');
        done();
      });
    },
    function (done) {
      client.getProgram(fixtures.testProgram.slug, function (err, program) {
        t.notOk(err, 'No error was raised when getting program from slug');
        t.ok(program, 'A program was returned');
        t.same(program.slug, 'test-program', 'Appropriate program was returned');
        done();
      });
    },
    function (done) {
      client.getProgram(fixtures.testProgram, function (err, program) {
        t.notOk(err, 'No error was raised when getting program');
        t.ok(program, 'A program was returned');
        t.same(program.slug, 'test-program', 'Appropriate program was returned');
        done();
      });
    },
    function (done) {
      client.getProgram(fixtures.missingProgram, function (err, program) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when getting non-existent program');
        t.notOk(program, 'No program should be returned');
        done();
      });
    }
  ], end(t));
});

