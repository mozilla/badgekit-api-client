const utils = require('../lib/modelUtils');

const BadgeInstance = require('../models/instance');

exports.getBadgeInstances = function getBadgeInstances (context, callback) {
  utils.getContext(context, this, 'Badge', function (err, badge) {
    if (err)
      return callback(err, null);

    const options = {
      path: badge._path + BadgeInstance.pathPart,
      filter: 'instances',
      default: [],
      generator: new utils.Generator(BadgeInstance, context)
    };

    this._remote.get(options, callback);
  }.bind(this));
}

function doBadgeInstanceAction(context, client, action, callback) {
  utils.getContext(context, client, 'Instance', function (err, badgeInstance) {
    if (err)
      return callback(err, null);

    badgeInstance[action](callback);
  });
}

exports.getBadgeInstance = function getBadgeInstance (context, callback) {
  doBadgeInstanceAction(context, this, 'load', callback);
}

exports.createBadgeInstance = function createBadgeInstance (context, callback) {
  doBadgeInstanceAction(context, this, 'create', callback);
}

exports.deleteBadgeInstance = function deleteBadgeInstance (context, callback) {
  doBadgeInstanceAction(context, this, 'delete', callback);
}

exports.updateBadgeInstance = function updateBadgeInstance (context, callback) {
  doBadgeInstanceAction(context, this, 'save', callback);
}
