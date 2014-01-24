const getSlug = require('../lib/getSlug');

/**
 * @callback requestCallback
 * @param {?object} err - Resulting error, if raised
 * @param {?*} data - Resulting data, if returned
 */

/**
 * Fetches applications for a badge
 * `GET /badges/<id>/applications`
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getBadgeApplications = function getBadgeApplications (badge, callback) {
  const options = {
    path: '/badges/' + getSlug(badge) + '/applications',
    filter: 'applications',
    default: []
  };

  this.remote.get(options, callback);
}

/**
 * Adds application to a badge
 * `POST /badges/<id>/applications`
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {object} application - Application object
 * @param {requestCallback} callback - Callback to handle response
 */
exports.addBadgeApplication = function addBadgeApplication (badge, application, callback) {
  const options = {
    path: '/badges/' + getSlug(badge) + '/applications',
    json: application,
    filter: 'status'
  };

  this.remote.post(options, callback);
}

/**
 * Fetches evidence for a given application
 * `GET /badges/<id>/applications/<id>/evidence`
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {string|object} application - Slug (or object with `slug` property) identifying application
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getAllBadgeApplicationEvidence = function getAllBadgeApplicationEvidence (badge, application, callback) {
  const options = {
    path: '/badges/' + getSlug(badge) + '/applications/' + getSlug(application) + '/evidence',
    filter: 'evidence',
    default: []
  };

  this.remote.get(options, callback);
}

/**
 * Adds evidence to a given application
 * `POST /badges/<id>/applications/<id>/evidence`
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {string|object} application - Slug (or object with `slug` property) identifying application
 * @param {object} evidence - Evidence object
 * @param {requestCallback} callback - Callback to handle response
 */
exports.addBadgeApplicationEvidence = function addBadgeApplicationEvidence (badge, application, evidence, callback) {
  const options = {
    path: '/badges/' + getSlug(badge) + '/applications/' + getSlug(application) + '/evidence',
    json: evidence,
    filter: 'status'
  };

  this.remote.post(options, callback);
}

/**
 * Fetches a single piece of evidence for a given application
 * `GET /badges/<id>/applications/<id>/evidence/<id>`
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {string|object} application - Slug (or object with `slug` property) identifying application
 * @param {string|object} evidence - Slug (or object with `slug` property) identifying evidence
 * @param {requestCallback} callback - Callback to handle response
 */
exports.getBadgeApplicationEvidence = function getBadgeApplicationEvidence (badge, application, evidence, callback) {
  const options = {
    path: '/badges/' + getSlug(badge) + '/applications/' + getSlug(application) + '/evidence/' + getSlug(evidence),
    filter: 'evidence'
  };

  this.remote.get(options, callback);
}

/**
 * Fetches a single piece of evidence for a given application
 * `DELETE /badges/<id>/applications/<id>/evidence/<id>`
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {string|object} application - Slug (or object with `slug` property) identifying application
 * @param {string|object} evidence - Slug (or object with `slug` property) identifying evidence
 * @param {requestCallback} callback - Callback to handle response
 */
exports.deleteBadgeApplicationEvidence = function deleteBadgeApplicationEvidence (badge, application, evidence, callback) {
  const options = {
    path: '/badges/' + getSlug(badge) + '/applications/' + getSlug(application) + '/evidence/' + getSlug(evidence),
    filter: 'status'
  };

  this.remote.delete(options, callback);
}

/**
 * Adds a comment to a given application
 * `POST /badges/<id>/applications/<id>/comment`
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {string|object} application - Slug (or object with `slug` property) identifying application
 * @param {object} comment - Comment object
 * @param {requestCallback} callback - Callback to handle response
 */
exports.addBadgeApplicationComment = function addBadgeApplicationComment (badge, application, comment, callback) {
  const options = {
    path: '/badges/' + getSlug(badge) + '/applications/' + getSlug(application) + '/comment',
    json: comment,
    filter: 'status'
  };

  this.remote.post(options, callback);
}

/**
 * Approves a given application
 * `POST /badges/<id>/applications/<id>/approve`
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {string|object} application - Slug (or object with `slug` property) identifying application
 * @param {requestCallback} callback - Callback to handle response
 */
exports.approveBadgeApplication = function approveBadgeApplication (badge, application, callback) {
  const options = {
    path: '/badges/' + getSlug(badge) + '/applications/' + getSlug(application) + '/approve',
    filter: 'status'
  };

  this.remote.post(options, callback);
}

/**
 * Denies a given application
 * `POST /badges/<id>/applications/<id>/deny`
 * @param {string|object} badge - Slug (or object with `slug` property) identifying badge
 * @param {string|object} application - Slug (or object with `slug` property) identifying application
 * @param {requestCallback} callback - Callback to handle response
 */
exports.denyBadgeApplication = function denyBadgeApplication (badge, application, callback) {
  const options = {
    path: '/badges/' + getSlug(badge) + '/applications/' + getSlug(application) + '/deny',
    filter: 'status'
  };

  this.remote.post(options, callback);
}
