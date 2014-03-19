const getClient = require('./client');
const test = require('tap').test;

function log (format, err, data) {
  console.log(format, err ? err.stack : JSON.stringify(data, null, 2));
}

getClient(function (client) {
  test('Get all claim codes', function (t) {
    const context = {
      system: 'chicago',
      badge: 'chicago-badge'
    };

    client.getClaimCodes(context, function (err, claimCodes) {
      t.notOk(err, 'No error was thrown');
      t.same(claimCodes.length, 3, 'Four claim codes were found');

      t.end();
    });
  });

  test('Get valid claim code', function (t) {
    const context = {
      system: 'chicago',
      badge: 'chicago-badge',
      claimCode: 'multiple-use'
    };

    client.getClaimCode(context, function (err, claimCode) {
      t.notOk(err, 'No error was thrown');
      t.same(claimCode.code, context.claimCode, 'Correct claim code was returned');

      t.end();
    })
  });

  test('Get invalid claim code', function (t) {
    const context = {
      system: 'chicago',
      badge: 'chicago-badge',
      claimCode: 'invalid-code'
    };

    client.getClaimCode(context, function (err, claimCode) {
      t.ok(err, 'An error was thrown');
      t.same(err.name, 'ResourceNotFoundError', 'Expected error raised');
      t.notOk(claimCode, 'No claim code was returned');

      t.end();
    });
  })

  test('Create new claim code', function (t) {
    const context = {
      system: 'chicago',
      badge: 'chicago-badge',
      claimCode: 'test-claim-code'
    };

    client.createClaimCode(context, function (err, claimCode) {
      t.notOk(err, 'No error was thrown');
      t.same(claimCode.code, context.claimCode, 'Correct claim code was returned');
      t.same(claimCode.badge.slug, context.badge, 'Claim code belongs to correct badge');

      t.end();
    });
  });

  test('Create invalid claim code', function (t) {
    const context = {
      system: 'chicago',
      badge: 'chicago-badge',
      claimCode: {multiuse: true}
    };

    client.createClaimCode(context, function (err, claimCode) {
      t.ok(err, 'An error was thrown');
      t.same(err.name, 'ValidationError', 'Expected error raised');
      t.notOk(claimCode, 'No claim code was returned');

      t.end();
    })
  });

  test('Create new random claim code', function (t) {
    const context = {
      system: 'chicago',
      badge: 'chicago-badge'
    };

    client.generateRandomClaimCode(context, function (err, claimCode) {
      t.notOk(err, 'No error was thrown');
      t.ok(claimCode.code.length > 1, 'Should have created a claim code');
      t.same(claimCode.badge.slug, context.badge, 'Claim code belongs to correct badge');

      t.end();
    });
  });

  test('Claim a claim code', function (t) {
    const context = {
      system: 'chicago',
      badge: 'chicago-badge',
      claimCode: 'test-claim-code'
    };
    const email = 'test@example.org';

    client.claimClaimCode(context, email, function (err, claimCode) {
      t.notOk(err, 'No error was thrown');
      t.same(claimCode.claimed, true, 'Claim code has been claimed');

      t.test('Claim code that has already been claimed', function (t) {
        client.claimClaimCode(context, email, function (err, claimCode) {
          t.ok(err, 'An error was thrown');
          t.same(err.name, 'CodeAlreadyUsedError', 'Expected error raised');
          t.notOk(claimCode, 'No claim code was returned');

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