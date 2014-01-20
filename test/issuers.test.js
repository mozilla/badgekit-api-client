const async = require('async');
const client = require('./client');
const fixtures = require('./fixtures/issuers');
const server = require('./server');
const test = require('tap').test;

function end (test) {
  return function () {
    test.end();
  }
}

test('Creating issuers', function (t) {
  server
    .postAndReturn('/issuers', fixtures.creationSuccessResponse)
    .postAndReturn('/issuers', fixtures.creationDuplicateResponse, 409)
    .postAndReturn('/issuers', fixtures.creationErrorResponse, 400);

  async.series([
    function (done) {
      client.createIssuer(fixtures.testIssuer, function (err, status) {
        t.notOk(err, 'No error was raised when creating issuer');
        t.same(status, 'created', 'Issuer was successfully created');
        done();
      });
    },
    function (done) {
      client.createIssuer(fixtures.testIssuer, function (err, status) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when creating duplicate issuer');
        t.notOk(status, 'Nothing should be returned');
        done();
      });
    },
    function (done) {
      client.createIssuer(fixtures.badIssuer, function (err, status) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when creating bad issuer');
        t.notOk(status, 'Nothing should be returned');
        done();
      });
    }
  ], end(t));
});

test('Getting issuers', function (t) {
  server
    .getAndReturn('/issuers', fixtures.getResponse)
    .getAndReturn('/issuers/test-issuer', fixtures.getSingleResponse)
    .getAndReturn('/issuers/test-issuer', fixtures.getSingleResponse)
    .getAndReturn('/issuers/missing-issuer', fixtures.notFoundResponse, 404);

  async.series([
    function (done) {
      client.getIssuers(function (err, issuers) {
        t.notOk(err, 'No error was raised when getting issuers');
        t.same(issuers.length, 1, 'Correct number of issuers returned');
        done();
      });
    },
    function (done) {
      client.getIssuer(fixtures.testIssuer.slug, function (err, issuer) {
        t.notOk(err, 'No error was raised when getting issuer from slug');
        t.ok(issuer, 'A issuer was returned');
        t.same(issuer.slug, 'test-issuer', 'Appropriate issuer was returned');
        done();
      });
    },
    function (done) {
      client.getIssuer(fixtures.testIssuer, function (err, issuer) {
        t.notOk(err, 'No error was raised when getting issuer');
        t.ok(issuer, 'A issuer was returned');
        t.same(issuer.slug, 'test-issuer', 'Appropriate issuer was returned');
        done();
      });
    },
    function (done) {
      client.getIssuer(fixtures.missingIssuer, function (err, issuer) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when getting non-existent issuer');
        t.notOk(issuer, 'No issuer should be returned');
        done();
      });
    }
  ], end(t));
});

