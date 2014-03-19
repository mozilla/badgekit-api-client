const getClient = require('./client');
const test = require('tap').test;

getClient(function (client) {
  test('Get all badges', function (t) {
    const context = {system: 'chicago'};

    client.getBadges(context, function (err, badges) {
      t.notOk(err, 'No error was thrown');
      t.same(badges.length, 3, 'Three badges were found');

      t.end();
    });
  });

  test('Get all badges, including archived', function (t) {
    const context = {system: 'chicago'};

    client.getAllBadges(context, function (err, badges) {
      t.notOk(err, 'No error was thrown');
      t.same(badges.length, 4, 'Four badges were found');

      t.end();
    });
  });

  test('Get valid badge', function (t) {
    const context = {
      system: 'chicago',
      badge: 'chicago-library-badge'
    };

    client.getBadge(context, function (err, badge) {
      t.notOk(err, 'No error was thrown');
      t.same(badge.slug, context.badge, 'Correct badge was returned');

      t.end();
    });
  });

  test('Get invalid badge', function (t) {
    const context = {
      system: 'chicago',
      badge: 'field-museum-badge'
    };

    client.getBadge(context, function (err, badge) {
      t.ok(err, 'An error was thrown');
      t.same(err.name, 'ResourceNotFoundError', 'Expected error raised');
      t.notOk(badge, 'No badge was returned');

      t.end();
    });
  });

  test('Get badge in wrong context', function (t) {
    const context = {
      system: 'chicago',
      badge: 'chicago-scratch-badge'
    };

    client.getBadge(context, function (err, badge) {
      t.notOk(err, 'No error was thrown');
      t.notSame(badge._parent.slug, context.system, 'Badge parent is not given system');

      t.end();
    })
  });

  test('Create new badge', function (t) {
    const context = {
      system: 'chicago',
      badge: {
        name: 'Test Badge',
        slug: 'test-badge',
        earnerDescription: 'Earner description',
        consumerDescription: 'Consumer description',
        criteriaUrl: 'http://example.org/criteria',
        unique: false,
        image: 'http://example.org/badge.png'
      }
    };

    client.createBadge(context, function (err, badge) {
      t.notOk(err, 'No error was thrown');
      t.same(badge.slug, context.badge.slug, 'Correct badge was returned');

      t.end();
    });
  });

  test('Create invalid badge', function (t) {
    const context = {
      system: 'chicago',
      badge: {}
    };

    client.createBadge(context, function (err, badge) {
      t.ok(err, 'An error was thrown');
      t.same(err.name, 'ValidationError', 'Expected error raised');
      t.notOk(badge, 'Badge was not returned');

      t.end();
    });
  });

  test('Update badge', function (t) {
    const context = {
      system: 'chicago',
      badge: {
        name: 'Updated Test Badge',
        slug: 'test-badge'
      }
    };

    client.updateBadge(context, function (err, badge) {
      t.notOk(err, 'No error was thrown');
      t.same(badge.slug, context.badge.slug, 'Correct badge was returned');
      t.same(badge.name, context.badge.name, 'Badge was correctly updated');

      t.test('Update directly on model', function (t) {
        badge.name = 'Test Badge';
        badge.save(function (err, badge) {
          t.notOk(err, 'No error was thrown');
          t.notSame(badge, context.badge.name, 'Badge name was changed');
          t.end();
        });
      });

      t.end();
    });
  });

  test('Delete badge', function (t) {
    const context = {
      system: 'chicago',
      badge: 'test-badge'
    };

    client.deleteBadge(context, function (err, badge) {
      t.notOk(err, 'No error was thrown');
      t.same(badge.slug, context.badge, 'Correct badge was returned');

      t.test('Delete missing badge', function (t) {
        client.deleteBadge(context, function (err, badge) {
          t.ok(err, 'An error was thrown');
          t.same(err.name, 'ResourceNotFoundError', 'Expected error raised');
          t.notOk(badge, 'No badge was returned');

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