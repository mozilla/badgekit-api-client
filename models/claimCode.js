const utils = require('../lib/modelUtils');

const BaseModel = require('./_base');

/**
 *
 */
function ClaimCode (data, parent) {
  BaseModel.call(this, data, parent);
}

ClaimCode.parseResponse = function parseResponse (data) {
  if (data.badge) {
    if (data.claimCodes) {
      data.claimCodes = data.claimCodes.map(function (code) {
        code.badge = data.badge;
        return code;
      });
    } else if (data.claimCode) {
      data.claimCode.badge = data.badge;
    }
  }

  return data;
}

Object.defineProperty(ClaimCode, 'pathIdentifier', {value: 'code'});

utils.initModel(ClaimCode, '/codes', {
  claim: function claimClaimCode (email, callback) {
    const options = {
      path: this._path + '/claim',
      filter: 'claimCode',
      generator: new utils.Generator(ClaimCode, this._heritage.badge),
      data: {email: email}
    };

    this._remote.post(options, callback);
  }
}, BaseModel);

exports = module.exports = ClaimCode;
