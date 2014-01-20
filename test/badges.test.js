const async = require('async');
const client = require('./client');
const fixtures = require('./fixtures/badges');
const server = require('./server');
const test = require('tap').test;

function end (test) {
  return function () {
    test.end();
  }
}

test('Creating badges', function (t) {
  server
    .postAndReturn('/badges', fixtures.creationSuccessResponse)
    .postAndReturn('/badges', fixtures.creationDuplicateResponse, 409)
    .postAndReturn('/badges', fixtures.creationErrorResponse, 400);

  async.series([
    function (done) {
      client.createBadge(fixtures.testBadge, function (err, status) {
        t.notOk(err, 'No error was raised when creating badge');
        t.same(status, 'created', 'Badge was successfully created');
        done();
      });
    },
    function (done) {
      client.createBadge(fixtures.testBadge, function (err, status) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when creating duplicate badge');
        t.notOk(status, 'Nothing should be returned');
        done();
      });
    },
    function (done) {
      client.createBadge(fixtures.badBadge, function (err, status) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when creating bad badge');
        t.notOk(status, 'Nothing should be returned');
        done();
      });
    }
  ], end(t));
});

test('Getting badges', function (t) {
  server
    .getAndReturn('/badges', fixtures.getResponse)
    .getAndReturn('/badges?archived=any', fixtures.getAllResponse)
    .getAndReturn('/badges/test-badge', fixtures.getSingleResponse)
    .getAndReturn('/badges/test-badge', fixtures.getSingleResponse)
    .getAndReturn('/badges/missing-badge', fixtures.notFoundResponse, 404);

  async.series([
    function (done) {
      client.getBadges(function (err, badges) {
        t.notOk(err, 'No error was raised when getting active badges');
        t.same(badges.length, 1, 'Correct number of active badges returned');
        done();
      });
    },
    function (done) {
      client.getAllBadges(function (err, badges) {
        t.notOk(err, 'No error was raised when getting all badges');
        t.same(badges.length, 2, 'Correct number of badges returned');
        done();
      })
    },
    function (done) {
      client.getBadge(fixtures.testBadge.slug, function (err, badge) {
        t.notOk(err, 'No error was raised when getting badge from slug');
        t.ok(badge, 'A badge was returned');
        t.same(badge.slug, 'test-badge', 'Appropriate badge was returned');
        done();
      });
    },
    function (done) {
      client.getBadge(fixtures.testBadge, function (err, badge) {
        t.notOk(err, 'No error was raised when getting badge');
        t.ok(badge, 'A badge was returned');
        t.same(badge.slug, 'test-badge', 'Appropriate badge was returned');
        done();
      });
    },
    function (done) {
      client.getBadge(fixtures.missingBadge, function (err, badge) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when getting non-existent badge');
        t.notOk(badge, 'No badge should be returned');
        done();
      });
    }
  ], end(t));
});

test('Updating badges', function (t) {
  server
    .putAndReturn('/badges/test-badge', fixtures.updateSuccessResponse)
    .putAndReturn('/badges/test-badge', fixtures.updateErrorResponse, 400)
    .putAndReturn('/badges/missing-badge', fixtures.notFoundResponse, 404);

  async.series([
    function (done) {
      client.updateBadge(fixtures.testBadge, function (err, status) {
        t.notOk(err, 'No error was raised when updating badge');
        t.same(status, 'updated', 'Badge was successfully updated');
        done();
      })
    },
    function (done) {
      client.updateBadge(fixtures.badBadge, function (err, status) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when updating badge invalidly');
        t.notOk(status, 'Nothing should be returned');
        done();
      });
    },
    function (done) {
      client.updateBadge(fixtures.missingBadge, function (err, status) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when updating badge invalidly');
        t.notOk(status, 'Nothing should be returned');
        done();
      });
    }
  ], end(t));
});

test('Deleting badges', function (t) {
  server
    .deleteAndReturn('/badges/test-badge', fixtures.deleteSuccessResponse)
    .deleteAndReturn('/badges/missing-badge', fixtures.notFoundResponse, 404);

  async.series([
    function (done) {
      client.deleteBadge(fixtures.testBadge, function (err, status) {
        t.notOk(err, 'No error was raised when deleting badge');
        t.same(status, 'deleted', 'Badge was successfully deleted');
        done();
      });
    },
    function (done) {
      client.deleteBadge(fixtures.missingBadge, function (err, status) {
        // Should probably confirm the type of error here
        t.ok(err, 'An error was raised when deleting a non-existent badge');
        t.notOk(status, 'Nothing should be returned');
        done();
      });
    }
  ], end(t));
});
