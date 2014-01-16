const async = require('async');
const badge = require('./fixtures/badge');
const client = require('./client');
const server = require('./server');
const test = require('tap').test;

function end (test) {
  return function () {
    test.end();
  }
}

test('Getting badges', function (t) {
  server
    .getAndReturn('/badges', {badges: [badge]})
    .getAndReturn('/badges/test-badge', {badge: badge})
    .getAndReturn('/badges/badge-not-found', {}, 404);

  async.series([
    function (done) {
      client.getBadges(function (err, badges) {
        t.notOk(err, 'No error was raised');
        t.same(badges.length, 1, 'Correct number of badges returned');
        done();
      });
    },
    function (done) {
      client.getBadge('test-badge', function (err, badge) {
        t.notOk(err, 'No error was raised');
        t.ok(badge, 'A badge was returned');
        t.same(badge.slug, 'test-badge', 'Appropriate badge was returned');
        done();
      });
    },
    function (done) {
      client.getBadge('badge-not-found', function (err, badge) {
        t.ok(err, 'An error was raised'); // Should confirm the type of error here
        t.notOk(badge, 'No badge should be returned');
        done();
      });
    }
  ], end(t));
});

test('Deleting badges', function (t) {
  server
    .deleteAndReturn('/badges/test-badge', {status: 'deleted'})
    .getAndReturn('/badges/test-badge', {}, 404);

  async.series([
    function (done) {
      client.deleteBadge('test-badge', function (err, status) {
        t.notOk(err, 'No error was raised');
        t.same(status, 'deleted', 'Badge was successfully deleted');
        done();
      });
    },
    function (done) {
      client.getBadge('test-badge', function (err, badge) {
        t.ok(err, 'An error was raised'); // Should confirm the type of error here
        t.notOk(badge, 'Badge should no longer exist');
        done();
      });
    }
  ], end(t));
});

test('Creating badges', function (t) {
  server
    .postAndReturn('/badges', {status: 'created'})
    .getAndReturn('/badges/test-badge', {badge: badge})
    .postAndReturn('/badges',
      {errors: [{name:'ValidatorError', message:'Missing value', field:"slug"}]}, 400);

  async.series([
    function (done) {
      client.createBadge(badge, function (err, status) {
        t.notOk(err, 'No error was raised');
        t.same(status, 'created', 'Badge was successfully created');
        done();
      });
    },
    function (done) {
      client.getBadge('test-badge', function (err, badge) {
        t.notOk(err, 'No error was raised');
        t.ok(badge, 'A badge was returned');
        t.same(badge.slug, 'test-badge', 'New badge returned');
        done();
      });
    },
    function (done) {
      var badBadge = {};
      client.createBadge(badBadge, function (err, status) {
        t.ok(err, 'An error was raised'); // Should confirm the type of error here
        t.notOk(status, 'Nothing should be returned');
        done();
      });
    }
  ], end(t));
});

test('Updating badges', function (t) {
  server
    .putAndReturn('/badges/test-badge', {status: 'updated'})
    .putAndReturn('/badges/test-badge',
      {errors: [{name:"ValidatorError", message:"String is not in range", field:"title"}]}, 400);

  async.series([
    function (done) {
      client.updateBadge(badge, function (err, status) {
        t.notOk(err, 'No error was raised');
        t.same(status, 'updated', 'Badge was successfully updated');
        done();
      })
    },
    function (done) {
      var badBadge = {slug: 'test-badge', 'title': ''};
      client.updateBadge(badBadge, function (err, status) {
        t.ok(err, 'An error was raised');
        t.notOk(status, 'Nothing should be returned');
        done();
      });
    }
  ], end(t));
});
