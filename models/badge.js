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
  ActionableModel.apply(this, arguments);

  loadModels();

  if (this.system)
    this.system = new models.System(this.system, this._heritage.client);

  if (this.issuer)
    this.issuer = new models.Issuer(this.issuer, this.system);

  if (this.program)
    this.program = new models.Program(this.program, this.issuer);
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
