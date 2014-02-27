const utils = require('../lib/modelUtils');

const Issuer = require('../models/issuer');

exports.getIssuers = function getIssuers (context, callback) {
  utils.getContext(context, this, 'System', function (err, system) {
    if (err)
      return callback(err, null);

    const options = {
      path: system._path + Issuer.pathPart,
      filter: 'issuers',
      default: [],
      generator: new utils.Generator(Issuer, system)
    };

    this._remote.get(options, callback);
  }.bind(this));
}

function doIssuerAction(context, client, action, callback) {
  utils.getContext(context, client, 'Issuer', function (err, issuer) {
    if (err)
      return callback(err, null);

    issuer[action](callback);
  });
}

exports.getIssuer = function getIssuer (context, callback) {
  doIssuerAction(context, this, 'load', callback);
}

exports.createIssuer = function createIssuer (context, callback) {
  doIssuerAction(context, this, 'create', callback);
}

exports.deleteIssuer = function deleteIssuer (context, callback) {
  doIssuerAction(context, this, 'delete', callback);
}

exports.updateIssuer = function updateIssuer (context, callback) {
  doIssuerAction(context, this, 'save', callback);
}
