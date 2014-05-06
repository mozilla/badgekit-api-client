const utils = require('../lib/modelUtils');

const BadgeInstance = require('../models/instance');

exports.getBadgeInstances = function getBadgeInstances (context, email, callback) {
  if (typeof email === 'function') {
    callback = email;
    email = null;
  }

  if (email) {
    utils.getContext(context, this, function (err, populatedContext) {
      if (err)
        return callback(err, null);

      const options = {
        path: populatedContext._path + BadgeInstance.pathPart + '/' + email,
        filter: 'instances',
        default: [],
        generator: new utils.Generator(BadgeInstance, context)
      };

      this._remote.get(options, callback);
    }.bind(this));
  }
  else {
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
}

function doBadgeInstanceAction(context, client, action, callback) {
  var args = Array.prototype.slice.call(arguments, 4);
  args.push(callback);

  utils.getContext(context, client, 'Instance', function (err, badgeInstance) {
    if (err)
      return callback(err, null);

    badgeInstance[action].apply(badgeInstance, args);
  });
}

exports.getBadgeInstance = function getBadgeInstance (context, callback) {
  doBadgeInstanceAction(context, this, 'load', callback);
}

exports.createBadgeInstance = function createBadgeInstance (context, code, callback) {
  if (!callback) {
    callback = code;
    code = undefined;
  }

  doBadgeInstanceAction(context, this, 'create', callback, code);
}

exports.deleteBadgeInstance = function deleteBadgeInstance (context, callback) {
  doBadgeInstanceAction(context, this, 'delete', callback);
}

exports.updateBadgeInstance = function updateBadgeInstance (context, callback) {
  doBadgeInstanceAction(context, this, 'save', callback);
}
