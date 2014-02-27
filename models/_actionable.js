const utils = require('../lib/modelUtils');

const Application = require('./application');
const BaseModel = require('./_base');
const Code = require('./code');

/**
 *
 */
function ActionableModel (data, parent) {
  BaseModel.apply(this, arguments);
}

utils.initModel(ActionableModel, {
  getApplications: utils.getAllOfModelType(Application),
  getClaimCodes: utils.getAllOfModelType(Code)
}, BaseModel);

exports = module.exports = ActionableModel;
