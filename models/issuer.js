const utils = require('../lib/modelUtils');

const ContainerModel = require('./_container');
const Program = require('./program');

/**
 *
 */
function Issuer (data, parent) {
  ContainerModel.apply(this, arguments);

  this.programs = (new utils.Generator(Program, this))(this.programs) || undefined;
}

utils.initModel(Issuer, '/issuers', {
  getPrograms: utils.getAllOfModelType(Program),
  getProgram: utils.getInstanceOfModelType(Program),
  addProgram: utils.addInstanceOfModelType(Program)
}, ContainerModel);

exports = module.exports = Issuer;
