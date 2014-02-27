const utils = require('../lib/modelUtils');

const BaseModel = require('./_base');

/**
 *
 */
function Instance (data, parent) {
  BaseModel.apply(this, arguments);
}

Object.defineProperty(Instance, 'pathIdentifier', {value: 'id'});

utils.initModel(Instance, '/instances', {}, BaseModel);

exports = module.exports = Instance;
