const getClient = require('./client');
const test = require('tap').test;

getClient(function (client) {
  test('Get all programs', function (t) {
    const context = {
      system: 'chicago',
      issuer: 'chicago-library'
    };

    client.getPrograms(context, function (err, programs) {
      console.log('Programs: %j', err ? err.stack : programs);
      t.notOk(err, 'No error was thrown');
      t.same(programs.length, 1, 'One program was found');

      t.end();
    });
  });

  test('Get valid program', function (t) {
    const context = {
      system: 'chicago',
      issuer: 'chicago-library',
      program: 'mit-scratch'
    };

    client.getProgram(context, function (err, program) {
      t.notOk(err, 'No error was thrown');
      t.same(program.slug, context.program, 'Correct program was returned');

      t.end();
    });
  });

  test('Get invalid issuer', function (t) {
    const context = {
      system: 'chicago',
      issuer: 'chicago-library',
      program: 'khan-academy'
    };

    client.getProgram(context, function (err, program) {
      t.ok(err, 'An error was thrown');
      t.same(err.name, 'ResourceNotFoundError', 'Expected error raised');
      t.notOk(program, 'No program was returned');

      t.end();
    });
  });

  test('Create new program', function (t) {
    const context = {
      system: 'chicago',
      issuer: 'chicago-library',
      program: {
        name: 'Test Program',
        slug: 'test-program',
        url: 'http://example.org'
      }
    };

    client.createProgram(context, function (err, program) {
      t.notOk(err, 'No error was thrown creating a program');
      t.same(program.slug, context.program.slug, 'Correct program was returned');

      t.end();
    });
  });

  test('Create invalid issuer', function (t) {
    const context = {
      system: 'chicago',
      issuer: 'chicago-library',
      program: {}
    };

    client.createProgram(context, function (err, program) {
      t.ok(err, 'An error was thrown');
      t.same(err.name, 'ValidationError', 'Expected error raised');
      t.notOk(program, 'Program was not returned');

      t.end();
    });
  });

  test('Update issuer', function (t) {
    const context = {
      system: 'chicago',
      issuer: 'chicago-library',
      program: {
        name: 'Updated Test Program',
        slug: 'test-program'
      }
    };

    client.updateProgram(context, function (err, program) {
      t.notOk(err, 'No error was thrown');
      t.same(program.slug, context.program.slug, 'Correct program was returned');
      t.same(program.name, context.program.name, 'Program was correctly updated');

      t.test('Update directly on model', function (t) {
        program.name = 'Test Program';
        program.save(function (err, program) {
          t.notOk(err, 'No error was thrown');
          t.notSame(program, context.program.name, 'Program name was changed');
          t.end();
        });
      });

      t.end();
    });
  });

  test('Delete issuer', function (t) {
    const context = {
      system: 'chicago',
      issuer: 'chicago-library',
      program: 'test-program'
    };

    client.deleteProgram(context, function (err, program) {
      t.notOk(err, 'No error was thrown');
      t.same(program.slug, context.program, 'Correct program was returned');

      t.test('Delete missing program', function (t) {
        client.deleteProgram(context, function (err, program) {
          t.ok(err, 'An error was thrown');
          t.same(err.name, 'ResourceNotFoundError', 'Expected error raised');
          t.notOk(program, 'No program was returned');

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
