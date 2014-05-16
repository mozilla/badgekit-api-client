const utils = require('../lib/modelUtils');

const BaseModel = require('./_base');

// Prevents race condition errors
var models;
function loadModels () {
  if (models) return;

  models = {
    Badge: require('./badge')
  }
}

function Milestone (data, parent) {
  loadModels();

  BaseModel.call(this, data, parent);
}

utils.initModel(Milestone, '/milestones', {}, BaseModel);

exports = module.exports = Milestone;
