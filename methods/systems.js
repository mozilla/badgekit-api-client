const getSlug = require('../lib/getSlug');

exports.getSystems = function getSystems (callback) {
  const options = {
    path: '/systems',
    filter: 'systems',
    default: []
  };

  this.remote.get(options, callback);
}

exports.getSystem = function getSystem (system, callback) {
  const options = {
    path: '/systems/' + getSlug(system)
  };

  this.remote.get(options, callback);
}

exports.createSystem = function createSystem (system, callback) {
  const options = {
    path: '/systems',
    json: system,
    filter: 'status'
  };

  this.remote.post(options, callback);
}

exports.deleteSystem = function deleteSystem (system, callback) {
  const options = {
    path: '/systems/' + getSlug(system),
    json: system,
    filter: 'status'
  };

  this.remote.del(options, callback);
}

exports.updateSystem = function updateSystem (system, callback) {
  const options = {
    path: '/systems/' + getSlug(system),
    json: system,
    filter: 'status'
  };

  this.remote.put(options, callback);
}
