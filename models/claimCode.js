const utils = require('../lib/modelUtils');

const BaseModel = require('./_base');

/**
 *
 */
function Code (data, parent) {
  BaseModel.call(this, data, parent);
}

Object.defineProperty(Code, 'pathIdentifier', {value: 'code'});

utils.initModel(Code, '/codes', {}, BaseModel);

exports = module.exports = Code;
