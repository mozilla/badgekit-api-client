const utils = require('../lib/modelUtils');

const ActionableModel = require('./_actionable');

// Prevents race condition errors
var models;
function loadModels () {
  if (models) return;

  models = {
    Issuer: require('./issuer'),
    Program: require('./program'),
    System: require('./system'),
    Application: require('./application'),
    BadgeInstance: require('./instance'),
    ClaimCode: require('./claimCode')
  }
}

/**
 *
 */
function Badge (data, parent) {
  loadModels();

  var client = parent;
  while (client._parent)
    client = client._parent;

  if (data.system) {
    data.system = new models.System(data.system, client);
    parent = data.system;
  }

  if (data.issuer) {
    data.issuer = new models.Issuer(data.issuer, data.system);
    parent = data.issuer;
  }

  if (data.program) {
    data.program = new models.Program(data.program, data.issuer);
    parent = data.program;
  }

  ActionableModel.call(this, data, parent);
}

utils.initModel(Badge, '/badges', {
  addApplication: function addApplication (application, callback) {
    application = new models.Application(application, this);
    application.create(callback);
  },
  addClaimCode: function addClaimCode (claimCode, callback) {
    claimCode = new models.ClaimCode(claimCode, this);
    claimCode.create(callback);
  },
  generateClaimCode: function generateClaimCode (callback) {
    const options = {
      path: this._path + models.ClaimCode.pathPart + '/random',
      filter: 'claimCode',
      generator: new utils.Generator(models.ClaimCode, this)
    }

    this._remote.post(options, callback);
  },
  getInstances: function getInstances () {
    const options = {
      path: this._path + models.BadgeInstance.pathPart,
      filter: 'instances',
      generator: new utils.Generator(models.BadgeInstance, this)
    }

    this._remote.get(options, callback);
  }
}, ActionableModel);

exports = module.exports = Badge;
