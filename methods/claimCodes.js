const utils = require('../lib/modelUtils');

const Code = require('../models/code');

exports.getClaimCodes = function getClaimCodes (context, callback) {
  utils.getContext(context, this, function (err, context) {
    if (err)
      return callback(err, null);

    const options = {
      path: context._path + Code.pathPart,
      filter: 'codes',
      default: [],
      generator: new utils.Generator(Code, context)
    };

    this._remote.get(options, callback);
  }.bind(this));
}

exports.generateRandomClaimCode = function generateRandomClaimCode (context, callback) {
  utils.getContext(context, this, 'Badge', function (err, badge) {
    if (err)
      return callback(err, null);

    badge.generateClaimCode(callback);
  });
}

function doClaimCodeAction(context, client, action, callback) {
  utils.getContext(context, client, 'Code', function (err, claimCode) {
    if (err)
      return callback(err, null);

    if (claimCode._parent.constructor.name !== 'Badge') {
      err = new Error('Missing badge');
      Object.defineProperty(err, 'name', 'ContextError');
      return callback(err, null);
    }

    claimCode[action](callback);
  });
}

exports.getClaimCode = function getClaimCode (context, callback) {
  doClaimCodeAction(context, this, 'load', callback);
}

exports.createClaimCode = function createClaimCode (context, callback) {
  doClaimCodeAction(context, this, 'create', callback);
}

exports.deleteClaimCode = function deleteClaimCode (context, callback) {
  doClaimCodeAction(context, this, 'delete', callback);
}

exports.updateClaimCode = function updateClaimCode (context, callback) {
  doClaimCodeAction(context, this, 'save', callback);
}
