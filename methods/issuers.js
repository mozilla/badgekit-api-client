const fixIssuer = require('../lib/augment')('issuer');
const getSlug = require('../lib/getSlug');

/**
 * @callback requestCallback
 * @param {?object} err - Resulting error, if raised
 * @param {?*} data - Resulting data, if returned
 */

/**
 * Fetches public issuers
 * `GET /issuers`
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getIssuers = function getIssuers (callback) {
  const client = this;
  const options = {
    path: '/issuers',
    filter: 'issuers',
    default: []
  };

  this.remote.get(options, function (err, issuers) {
    if (issuers) issuers = issuers.map(fixIssuer.bind(null, client));
    callback(err, issuers);
  });
}

/**
 * Fetches a single issuer
 * `GET /issuers/<id>`
 * @param {string|object} issuer - Slug (or object containing slug) identifying issuer
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getIssuer = function getIssuer (issuer, callback) {
  const client = this;
  const options = {
    path: '/issuers/' + getSlug(issuer),
    filter: 'issuer'
  };

  this.remote.get(options, function (err, issuer) {
    callback(err, fixIssuer(client, issuer));
  });
}

/**
 * Creates a new issuer
 * `POST /issuers`
 * @param {object} issuer - Issuer object
 * @param {requestCallback} callback - Callback to handle response
 */
exports.createIssuer = function createIssuer (issuer, callback) {
  const options = {
    path: '/issuers',
    json: issuer,
    filter: 'status'
  };

  this.remote.post(options, callback);
}

/**
 * Deletes an existing issuer
 * `DELETE /issuers/<id>`
 * @param {string|object} issuer - Slug (or object containing slug) identifying issuer
 * @param {requestCallback} callback - Callback to handle response
 */
exports.deleteIssuer = function deleteIssuer (issuer, callback) {
  const options = {
    path: '/issuers/' + getSlug(issuer),
    filter: 'status'
  };

  this.remote.del(options, callback);
}

/**
 * Updates an existing issuer
 * `PUT /issuers/<id>`
 * @param {object} issuer - Issuer object
 * @param {requestCallback} callback - Callback to handle response
 */
exports.updateIssuer = function updateIssuer (issuer, callback) {
  const options = {
    path: '/issuers/' + getSlug(issuer),
    json: issuer,
    filter: 'status'
  };

  this.remote.put(options, callback);
}
