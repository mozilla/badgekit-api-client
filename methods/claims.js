const getSlug = require('../lib/getSlug');

/**
 * @callback requestCallback
 * @param {?object} err - Resulting error, if raised
 * @param {?*} data - Resulting data, if returned
 */

/**
 * Fetches claim codes for a given badge
 * `GET /badges/<id>/codes`
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getBadgeCodes = function getBadgeCodes (badge, callback) {
  const options = {
    path: '/badges/' + getSlug(badge) + '/codes',
    filter: 'codes',
    default: []
  };

  this.remote.get(options, callback);
}

/**
 * Adds claim codes to a badge
 * `POST /badges/<id>/codes`
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {string|string[]} codes - Array of claim codes to add to specified badge
 * @param {requestCallback} callback - Callback to handle response
 */
exports.addBadgeCodes = function addBadgeCodes (badge, codes, callback) {
  if (!Array.isArray(codes))
    codes = [codes];

  const options = {
    path: '/badges/' + getSlug(badge) + '/codes',
    json: codes
  };

  this.remote.post(options, callback);
}

/**
 * Generates random claim codes for a badge
 * `POST /badges/<id>/codes/random`
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {requestCallback} callback - Callback to handle response
 */
exports.generateBadgeCodes = function generateBadgeCodes (badge, callback) {
  const options = {
    path: '/badges/' + getSlug(badge) + '/codes/random',
    filter: 'codes',
    default: []
  };

  this.remote.post(options, callback);
}

/**
 * Fetches information about a claim code
 * `POST /badges/<id>/codes/random`
 * @param {string|object} code - Slug (or object with `slug` property) identifying code
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getCode = function getCode (code, callback) {
  const options = {
    path: '/codes/' + getSlug(code),
    filter: 'code'
  };

  this.remote.get(options, callback);
}

/**
 * Deletes an existing claim code
 * `DELETE /codes/<id>`
 * @param {string|object} code - Slug (or object with `slug` property) identifying code
 * @param {requestCallback} callback - Callback to handle response
 */
exports.deleteCode = function deleteCode (code, callback) {
  const options = {
    path: '/codes/' + getSlug(code),
    filter: 'status'
  };

  this.remote.delete(options, callback);
}

/**
 * Claim a code
 * `POST /codes/<id>/claim`
 * @param {string|object} code - Slug (or object with `slug` property) identifying badge
 * @param {requestCallback} callback - Callback to handle response
 */
exports.claimCode = function claimCode (code, callback) {
  const options = {
    path: '/codes/' + getSlug(code) + '/claim',
    filter: 'status'
  };

  this.remote.post(options, callback);
}

/**
 * Unclaim a code
 * `POST /codes/<id>/unclaim`
 * @param {string|object} code - Slug (or object with `slug` property) identifying badge
 * @param {requestCallback} callback - Callback to handle response
 */
exports.unclaimCode = function unclaimCode (code, callback) {
  const options = {
    path: '/codes/' + getSlug(code) + '/unclaim',
    filter: 'status'
  };

  this.remote.post(options, callback);
}
