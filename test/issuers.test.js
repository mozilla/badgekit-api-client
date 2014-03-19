const getClient = require('./client');
const test = require('tap').test;

getClient(function (client) {
  test('Get all issuers', function (t) {
    const context = {system: 'pittsburgh'};

    client.getIssuers(context, function (err, issuers) {
      t.notOk(err, 'No error was thrown');
      t.same(issuers.length, 1, 'One issuer was found');

      t.end();
    });
  });

  test('Get valid issuer', function (t) {
    const context = {
      system: 'pittsburgh',
      issuer: 'carnegie-library'
    };

    client.getIssuer(context, function (err, issuer) {
      t.notOk(err, 'No error was thrown');
      t.same(issuer.slug, context.issuer, 'Correct issuer was returned');

      t.end();
    });
  });

  test('Get invalid issuer', function (t) {
    const context = {
      system: 'pittsburgh',
      issuer: 'toonseum'
    };

    client.getIssuer(context, function (err, issuer) {
      t.ok(err, 'An error was thrown');
      t.same(err.name, 'ResourceNotFoundError', 'Expected error raised');
      t.notOk(issuer, 'No issuer was returned');

      t.end();
    });
  });

  test('Create new issuer', function (t) {
    const context = {
      system: 'pittsburgh',
      issuer: {
        name: 'Test Issuer',
        slug: 'test-issuer',
        url: 'http://example.org'
      }
    };

    client.createIssuer(context, function (err, issuer) {
      t.notOk(err, 'No error was thrown creating an issuer');
      t.same(issuer.slug, context.issuer.slug, 'Correct issuer was returned');

      t.end();
    });
  });

  test('Create invalid issuer', function (t) {
    const context = {
      system: 'pittsburgh',
      issuer: {}
    };

    client.createIssuer(context, function (err, issuer) {
      t.ok(err, 'An error was thrown');
      t.same(err.name, 'ValidationError', 'Expected error raised');
      t.notOk(issuer, 'Issuer was not returned');

      t.end();
    });
  });

  test('Update issuer', function (t) {
    const context = {
      system: 'pittsburgh',
      issuer: {
        name: 'Updated Test Issuer',
        slug: 'test-issuer'
      }
    };

    client.updateIssuer(context, function (err, issuer) {
      t.notOk(err, 'No error was thrown');
      t.same(issuer.slug, context.issuer.slug, 'Correct issuer was returned');
      t.same(issuer.name, context.issuer.name, 'Issuer was correctly updated');

      t.test('Update directly on model', function (t) {
        issuer.name = 'Test Issuer';
        issuer.save(function (err, issuer) {
          t.notOk(err, 'No error was thrown');
          t.notSame(issuer, context.issuer.name, 'Issuer name was changed');
          t.end();
        });
      });

      t.end();
    });
  });

  test('Delete issuer', function (t) {
    const context = {
      system: 'pittsburgh',
      issuer: 'test-issuer'
    };

    client.deleteIssuer(context, function (err, issuer) {
      t.notOk(err, 'No error was thrown');
      t.same(issuer.slug, context.issuer, 'Correct issuer was returned');

      t.test('Delete missing issuer', function (t) {
        client.deleteIssuer(context, function (err, issuer) {
          t.ok(err, 'An error was thrown');
          t.same(err.name, 'ResourceNotFoundError', 'Expected error raised');
          t.notOk(issuer, 'No issuer was returned');

          t.end();
        });
      });

      t.end();
    });
  });

  test(':cleanup:', function (t) {
    client.done();
    t.end();
  });
});
