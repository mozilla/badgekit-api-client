const utils = require('../lib/modelUtils');

const Badge = require('../models/badge');

function findBadges (context, client, callback, query) {
  utils.getContext(context, client, function (err, context) {
    if (err)
      return callback(err, null);

    const options = {
      path: context._path + Badge.pathPart,
      filter: 'badges',
      default: [],
      generator: new utils.Generator(Badge, context),
      query: query ? query : undefined
    };

    client._remote.get(options, callback);
  });
}

exports.getBadges = function getBadges (context, callback) {
  findBadges(context, this, callback);
}

exports.getAllBadges = function getAllBadges (context, callback) {
  findBadges(context, this, callback, {archived: 'any'});
}

function doBadgeAction(context, client, action, callback) {
  utils.getContext(context, client, 'Badge', function (err, badge) {
    if (err)
      return callback(err, null);

    badge[action](callback);
  });
}

exports.getBadge = function getBadge (context, callback) {
  doBadgeAction(context, this, 'load', callback);
}

exports.createBadge = function createBadge (context, callback) {
  doBadgeAction(context, this, 'create', callback);
}

exports.deleteBadge = function deleteBadge (context, callback) {
  doBadgeAction(context, this, 'delete', callback);
}

exports.updateBadge = function updateBadge (context, callback) {
  doBadgeAction(context, this, 'save', callback);
}

exports.getBadgeFromCode = function getBadgeFromCode (context, code, callback) {
  utils.getContext(context, this, function (err, context) {
    if (err)
      return callback(err, null);

    const options = {
      path: context._path + '/codes/' + code,
      filter: 'badge',
      default: [],
      generator: new utils.Generator(Badge, context)
    };

    this._remote.get(options, callback);
  }.bind(this));
}
