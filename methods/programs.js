const getSlug = require('../lib/getSlug');

exports.getPrograms = function getPrograms (callback) {
  const options = {
    path: '/programs',
    filter: 'programs',
    default: []
  };

  this.remote.get(options, callback);
}

exports.getProgram = function getProgram (program, callback) {
  const options = {
    path: '/programs/' + getSlug(program)
  };

  this.remote.get(options, callback);
}

exports.createProgram = function createProgram (program, callback) {
  const options = {
    path: '/programs',
    json: program,
    filter: 'status'
  };

  this.remote.post(options, callback);
}

exports.deleteProgram = function deleteProgram (program, callback) {
  const options = {
    path: '/programs/' + getSlug(program),
    json: program,
    filter: 'status'
  };

  this.remote.del(options, callback);
}

exports.updateProgram = function updateProgram (program, callback) {
  const options = {
    path: '/programs/' + getSlug(program),
    json: program,
    filter: 'status'
  };

  this.remote.put(options, callback);
}
