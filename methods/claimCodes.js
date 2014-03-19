const utils = require('../lib/modelUtils');

const ClaimCode = require('../models/claimCode');

exports.getClaimCodes = function getClaimCodes (context, callback) {
  utils.getContext(context, this, function (err, context) {
    if (err)
      return callback(err, null);

    const options = {
      path: context._path + ClaimCode.pathPart,
      filter: 'claimCodes',
      default: [],
      generator: new utils.Generator(ClaimCode, context)
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
  var args = Array.prototype.slice.call(arguments, 4);
  args.push(callback);

  utils.getContext(context, client, 'ClaimCode', function (err, claimCode) {
    if (err)
      return callback(err, null);

    claimCode[action].apply(claimCode, args);
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

exports.claimClaimCode = function claimClaimCode (context, email, callback) {
  doClaimCodeAction(context, this, 'claim', callback, email);
}