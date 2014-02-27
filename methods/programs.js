const utils = require('../lib/modelUtils');

const Program = require('../models/program');

exports.getPrograms = function getPrograms (context, callback) {
  utils.getContext(context, this, 'Issuer', function (err, issuer) {
    if (err)
      return callback(err, null);

    const options = {
      path: issuer._path + Program.pathPart,
      filter: 'programs',
      default: [],
      generator: new utils.Generator(Program, issuer)
    };

    this._remote.get(options, callback);
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
