const utils = require('../lib/modelUtils');

const BadgeInstance = require('../models/instance');

exports.getBadgeInstances = function getBadgeInstances (context, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  else if (typeof options === 'string') {
    options = { email: options }
  }

  if (options.email) {
    utils.getContext(context, this, function (err, populatedContext) {
      if (err)
        return callback(err, null);

      const opts = {
        path: populatedContext._path + BadgeInstance.pathPart + '/' + encodeURIComponent(options.email),
        filter: 'instances',
        default: [],
        generator: new utils.Generator(BadgeInstance, context), 
        query: options.paginate ? options.paginate : undefined
      };

      this._remote.get(opts, callback);
    }.bind(this));
  }
  else {
    utils.getContext(context, this, 'Badge', function (err, badge) {
      if (err)
        return callback(err, null);

      const opts = {
        path: badge._path + BadgeInstance.pathPart,
        filter: 'instances',
        default: [],
        generator: new utils.Generator(BadgeInstance, context), 
        query: options.paginate ? options.paginate : undefined        
      };

      this._remote.get(opts, callback);
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

exports.createBadgeInstance = function createBadgeInstance (context, options, callback) {
  if (!callback) {
    callback = options;
    options = {};
  }

  if (typeof options === 'string') {
    options = { code: options }
  }
  
  doBadgeInstanceAction(context, this, 'create', callback, options);
}

exports.createBadgeInstances = function createBadgeInstances (context, callback) {
  utils.getContext(context, this, function (err, populatedContext) {
    if (err)
      return callback(err, null);

    const opts = {
      path: populatedContext._path + BadgeInstance.pathPart + '/bulk',
      filter: 'instances',
      default: [],
      generator: new utils.Generator(BadgeInstance, context), 
      data: context
    };

    this._remote.post(opts, callback);
  }.bind(this));
}


exports.deleteBadgeInstance = function deleteBadgeInstance (context, callback) {
  doBadgeInstanceAction(context, this, 'delete', callback);
}

exports.updateBadgeInstance = function updateBadgeInstance (context, callback) {
  doBadgeInstanceAction(context, this, 'save', callback);
}
