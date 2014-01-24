const getSlug = require('../lib/getSlug');

/**
 * @callback requestCallback
 * @param {?object} err - Resulting error, if raised
 * @param {?*} data - Resulting data, if returned
 */

/**
 * Fetches badge awards
 * `GET /badges/<id>/awards
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getBadgeAwards = function getBadgeAwards (badge, callback) {
  const options = {
    path: '/badges/' + getSlug(badge) + '/awards',
    filter: 'awards',
    default: []
  };

  this.remote.get(options, callback);
}

/**
 * Awards a badge
 * `POST /badges/<id>/awards
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {object} award - Award
 * @param {requestCallback} callback - Callback to handle response
 */
exports.grantBadgeAward = function grantBadgeAward (badge, award, callback) {
  const options = {
    path: '/badges/' + getSlug(badge) + '/awards',
    json: award,
    filter: 'status'
  };

  this.remote.post(options, callback);
}

/**
 * Rescinds an awarded badge
 * `DELETE /badges/<id>/awards/<id>
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {string|object} award - Slug (or object with `slug` property) identifying award
 * @param {requestCallback} callback - Callback to handle response
 */
exports.rescindBadgeAward = function rescindBadgeAward (badge, award, callback) {
  const options = {
    path: '/awards/' + getSlug(badge) + '/awards/' + getSlug(award),
    filter: 'status'
  };

  this.remote.delete(options, callback);
}
