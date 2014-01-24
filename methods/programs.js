const fixProgram = require('../lib/augment')('program');
const getSlug = require('../lib/getSlug');

/**
 * @callback requestCallback
 * @param {?object} err - Resulting error, if raised
 * @param {?*} data - Resulting data, if returned
 */

/**
 * Fetches all programs
 * `GET /programs`
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getPrograms = function getPrograms (callback) {
  const client = this;
  const options = {
    path: '/programs',
    filter: 'programs',
    default: []
  };

  this.remote.get(options, function (err, programs) {
    if (programs) programs = programs.map(fixProgram.bind(null, client));
    callback(err, programs);
  });
}

/**
 * Fetches a single program
 * `GET /programs/<id>`
 * @param {string|object} program - Slug (or object with `slug` property) identifying program
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getProgram = function getProgram (program, callback) {
  const client = this;
  const options = {
    path: '/programs/' + getSlug(program),
    filter: 'program'
  };

  this.remote.get(options, function (err, program) {
    callback(err, fixProgram(client, program));
  });
}

/**
 * Creates a new program
 * `POST /programs`
 * @param {object} program - Program object
 * @param {requestCallback} callback - Callback to handle response
 */
exports.createProgram = function createProgram (program, callback) {
  const options = {
    path: '/programs',
    json: program,
    filter: 'status'
  };

  this.remote.post(options, callback);
}

/**
 * Deletes an existing program
 * `DELETE /programs/<id>`
 * @param {string|object} program - Slug (or object with `slug` property) identifying program
 * @param {requestCallback} callback - Callback to handle response
 */
exports.deleteProgram = function deleteProgram (program, callback) {
  const options = {
    path: '/programs/' + getSlug(program),
    filter: 'status'
  };

  this.remote.del(options, callback);
}

/**
 * Updates an existing program
 * `PUT /programs/<id>`
 * @param {object} program - Program object
 * @param {requestCallback} callback - Callback to handle response
 */
exports.updateProgram = function updateProgram (program, callback) {
  const options = {
    path: '/programs/' + getSlug(program),
    json: program,
    filter: 'status'
  };

  this.remote.put(options, callback);
}
