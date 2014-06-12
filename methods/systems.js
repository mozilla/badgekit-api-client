const utils = require('../lib/modelUtils');

const System = require('../models/system');

exports.getSystems = function getSystems (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const opts = {
    path: this._path + System.pathPart,
    filter: 'systems',
    default: [],
    generator: new utils.Generator(System, this),
    query: options.paginate ? options.paginate : undefined
  };

  this._remote.get(opts, callback);
}

function doSystemAction(context, client, action, callback) {
  utils.getContext(context, client, 'System', function (err, system) {
    if (err)
      return callback(err, null);

    system[action](callback);
  });
}

exports.getSystem = function getSystem (context, callback) {
  doSystemAction(context, this, 'load', callback);
}

exports.createSystem = function createSystem (context, callback) {
  doSystemAction(context, this, 'create', callback);
}

exports.deleteSystem = function deleteSystem (context, callback) {
  doSystemAction(context, this, 'delete', callback);
}

exports.updateSystem = function updateSystem (context, callback) {
  doSystemAction(context, this, 'save', callback);
}
