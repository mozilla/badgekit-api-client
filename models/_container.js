const utils = require('../lib/modelUtils');

const ActionableModel = require('./_actionable');
const Badge = require('./badge');

/**
 *
 */
function ContainerModel (data, parent) {
  ActionableModel.apply(this, arguments);
}

utils.initModel(ContainerModel, {
  getBadges: utils.getAllOfModelType(Badge),
  getBadge: utils.getInstanceOfModelType(Badge),
  addBadge: utils.addInstanceOfModelType(Badge)
}, ActionableModel);

exports = module.exports = ContainerModel;