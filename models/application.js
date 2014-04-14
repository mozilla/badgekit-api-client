const utils = require('../lib/modelUtils');

const BaseModel = require('./_base');
const Evidence = require('./evidence');

// Prevents race condition errors
var models;
function loadModels () {
  if (models) return;

  models = {
    Badge: require('./badge'),
    Evidence: Evidence
  }
}

/**
 *
 */
function Application (data, parent) {
  loadModels();

  if (data.badge) {
    parent = data.badge = new models.Badge(data.badge, parent._parent);
  }

  BaseModel.call(this, data, parent);

  this.evidence = (this.evidence || []).map(function (evidence) {
    return new models.Evidence(evidence, this);
  }.bind(this));
}

utils.initModel(Application, '/applications', {
  getEvidence: utils.getAllOfModelType(Evidence),
  getEvidenceItem: utils.getInstanceOfModelType(Evidence),
  addEvidence: utils.addInstanceOfModelType(Evidence),
  deleteEvidence: utils.deleteInstanceOfModelType(Evidence),
}, BaseModel);

exports = module.exports = Application;
