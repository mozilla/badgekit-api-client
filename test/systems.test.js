const getClient = require('./client');
const test = require('tap').test;

getClient(function (client) {
  test('Get all systems', function (t) {
    client.getSystems(function (err, systems) {
      t.notOk(err, 'No error was thrown');
      t.same(systems.length, 2, 'Two systems were found');

      t.end();
    });
  });

  test('Get valid system', function (t) {
    const context = {system: 'pittsburgh'};

    client.getSystem(context, function (err, system) {
      t.notOk(err, 'No error was thrown');
      t.same(system.slug, context.system, 'Correct system was returned');

      t.end();
    });
  });

  test('Get invalid system', function (t) {
    const context = {system: 'london'};

    client.getSystem(context, function (err, system) {
      t.ok(err, 'An error was thrown');
      t.same(err.name, 'ResourceNotFoundError', 'Expected error raised');
      t.notOk(system, 'No system was returned');

      t.end();
    });
  });

  test('Create new system', function (t) {
    const context = {system: {
      name: 'Test System',
      slug: 'test-system',
      url: 'http://example.org'
    }};

    client.createSystem(context, function (err, system) {
      t.notOk(err, 'No error was thrown creating a system');
      t.same(system.slug, context.system.slug, 'Correct system was returned');

      t.end();
    });
  });

  test('Create invalid system', function (t) {
    const context = {system: {}};

    client.createSystem(context, function (err, system) {
      t.ok(err, 'An error was thrown');
      t.same(err.name, 'ValidationError', 'Expected error raised');
      t.notOk(system, 'System was not returned');

      t.end();
    });
  });

  test('Update system', function (t) {
    const context = {system: {
      name: 'Updated Test System',
      slug: 'test-system'
    }};

    client.updateSystem(context, function (err, system) {
      t.notOk(err, 'No error was thrown');
      t.same(system.slug, context.system.slug, 'Correct system was returned');
      t.same(system.name, context.system.name, 'System was correctly updated');

      t.test('Update directly on model', function (t) {
        system.name = 'Test System';
        system.save(function (err, system) {
          t.notOk(err, 'No error was thrown');
          t.notSame(system, context.system.name, 'System name was changed');
          t.end();
        });
      });

      t.end();
    });
  });

  test('Delete system', function (t) {
    const context = {system: 'test-system'};

    client.deleteSystem(context, function (err, system) {
      t.notOk(err, 'No error was thrown');
      t.same(system.slug, context.system, 'Correct system was returned');

      t.test('Delete missing system', function (t) {
        client.deleteSystem(context, function (err, system) {
          t.ok(err, 'An error was thrown');
          t.same(err.name, 'ResourceNotFoundError', 'Expected error raised');
          t.notOk(system, 'No system was returned');

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
