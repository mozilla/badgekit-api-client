const getSlug = require('../lib/getSlug');

/**
 * @callback requestCallback
 * @param {?object} err - Resulting error, if raised
 * @param {?*} data - Resulting data, if returned
 */

/**
 * Fetches all systems
 * `GET /systems`
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getSystems = function getSystems (callback) {
  const options = {
    path: '/systems',
    filter: 'systems',
    default: []
  };

  this.remote.get(options, callback);
}

/**
 * Fetches a single system
 * `GET /systems/<id>`
 * @param {string|object} system - Slug (or object containing slug) identifying system
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getSystem = function getSystem (system, callback) {
  const options = {
    path: '/systems/' + getSlug(system),
    filter: 'system'
  };

  this.remote.get(options, callback);
}

/**
 * Creates a new system
 * `POST /systems`
 * @param {object} system - System object
 * @param {requestCallback} callback - Callback to handle response
 */
exports.createSystem = function createSystem (system, callback) {
  const options = {
    path: '/systems',
    json: system,
    filter: 'status'
  };

  this.remote.post(options, callback);
}

/**
 * Deletes an existing system
 * `DELETE /systems/<id>`
 * @param {string|object} system - Slug (or object containing slug) identifying system
 * @param {requestCallback} callback - Callback to handle response
 */
exports.deleteSystem = function deleteSystem (system, callback) {
  const options = {
    path: '/systems/' + getSlug(system),
    filter: 'status'
  };

  this.remote.del(options, callback);
}

/**
 * Updates an existing system
 * `PUT /systems/<id>`
 * @param {object} system - System object
 * @param {requestCallback} callback - Callback to handle response
 */
exports.updateSystem = function updateSystem (system, callback) {
  const options = {
    path: '/systems/' + getSlug(system),
    json: system,
    filter: 'status'
  };

  this.remote.put(options, callback);
}
