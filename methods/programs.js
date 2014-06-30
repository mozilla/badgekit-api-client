const utils = require('../lib/modelUtils');

const Program = require('../models/program');

exports.getPrograms = function getPrograms (context, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  utils.getContext(context, this, 'Issuer', function (err, issuer) {
    if (err)
      return callback(err, null);

    const opts = {
      path: issuer._path + Program.pathPart,
      filter: 'programs',
      default: [],
      generator: new utils.Generator(Program, issuer),
      query: options.paginate ? options.paginate : undefined
    };

    this._remote.get(opts, callback);
  }.bind(this));
}

function doProgramAction(context, client, action, callback) {
  utils.getContext(context, client, 'Program', function (err, program) {
    if (err)
      return callback(err, null);

    program[action](callback);
  });
}

exports.getProgram = function getProgram (context, callback) {
  doProgramAction(context, this, 'load', callback);
}

exports.createProgram = function createProgram (context, callback) {
  doProgramAction(context, this, 'create', callback);
}

exports.deleteProgram = function deleteProgram (context, callback) {
  doProgramAction(context, this, 'delete', callback);
}

exports.updateProgram = function updateProgram (context, callback) {
  doProgramAction(context, this, 'save', callback);
}
