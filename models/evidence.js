const utils = require('../lib/modelUtils');

const BaseModel = require('./_base');

/**
 *
 */
function Evidence (data, parent) {
  BaseModel.apply(this, arguments);
}

utils.initModel(Evidence, '/evidence', {}, BaseModel);

exports = module.exports = Evidence;
