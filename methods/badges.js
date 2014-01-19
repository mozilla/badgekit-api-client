const fixBadge = require('../lib/augment')('badge');
const getSlug = require('../lib/getSlug');

/**
 * @callback requestCallback
 * @param {?object} err - Resulting error, if raised
 * @param {?*} data - Resulting data, if returned
 */

/**
 * Fetches public badges
 * `GET /badges`
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getBadges = function getBadges (callback) {
  const client = this;
  const options = {
    path: '/badges',
    filter: 'badges',
    default: []
  };

  this.remote.get(options, function (err, badges) {
    if (badges) badges = badges.map(fixBadge.bind(null, client));
    callback(err, badges);
  });
}

/**
 * Fetches all badges, including those which are archived
 * `GET /badges?archived=any`
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getAllBadges = function getAllBadges (callback) {
  const client = this;
  const options = {
    path: '/badges',
    query: {archived: 'any'},
    filter: 'badges',
    default: []
  };

  this.remote.get(options, function (err, badges) {
    if (badges) badges = badges.map(fixBadge.bind(null, client));
    callback(err, badges);
  });
}

/**
 * Fetches a single badge
 * `GET /badges/<id>`
 * @param {string|object} badge - Slug (or object containing slug) identifying badge
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getBadge = function getBadge (badge, callback) {
  const client = this;
  const options = {
    path: '/badges/' + getSlug(badge),
    filter: 'badge'
  };

  this.remote.get(options, function (err, badge) {
    callback(err, fixBadge(client, badge));
  });
}

/**
 * Creates a new badge
 * `POST /badges`
 * @param {object} badge - Badge object
 * @param {requestCallback} callback - Callback to handle response
 */
exports.createBadge = function createBadge (badge, callback) {
  const options = {
    path: '/badges',
    json: badge,
    filter: 'status'
  };

  this.remote.post(options, callback);
}

/**
 * Deletes an existing badges
 * `DELETE /badges/<id>`
 * @param {string|object} badge - Slug (or object containing slug) identifying badge
 * @param {requestCallback} callback - Callback to handle response
 */
exports.deleteBadge = function deleteBadge (badge, callback) {
  const options = {
    path: '/badges/' + getSlug(badge),
    filter: 'status'
  };

  this.remote.del(options, callback);
}

/**
 * Updates an existing badge
 * `PUT /badges/<id>`
 * @param {object} badge - Badge object
 * @param {requestCallback} callback - Callback to handle response
 */
exports.updateBadge = function updateBadge (badge, callback) {
  const options = {
    path: '/badges/' + getSlug(badge),
    json: badge,
    filter: 'status'
  };

  console.log(options);
  this.remote.put(options, callback);
}
