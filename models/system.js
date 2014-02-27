const utils = require('../lib/modelUtils');

const ContainerModel = require('./_container');
const Issuer = require('./issuer');

/**
 *
 */
function System (data, parent) {
  ContainerModel.apply(this, arguments);

  this.issuers = (new utils.Generator(Issuer, this))(this.issuers) || undefined;
}

utils.initModel(System, '/systems', {
  getIssuers: utils.getAllOfModelType(Issuer),
  getIssuer: utils.getInstanceOfModelType(Issuer),
  addIssuer: utils.addInstanceOfModelType(Issuer)
}, ContainerModel);

exports = module.exports = System;
