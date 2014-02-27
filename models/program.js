const utils = require('../lib/modelUtils');

const ContainerModel = require('./_container');

/**
 *
 */
function Program (data, parent) {
  ContainerModel.apply(this, arguments);
}

utils.initModel(Program, '/programs', {}, ContainerModel);

exports = module.exports = Program;
