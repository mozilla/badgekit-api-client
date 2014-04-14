const utils = require('../lib/modelUtils');

const BaseModel = require('./_base');

// Prevents race condition errors
var models;
function loadModels () {
  if (models) return;

  models = {
    Application: require('./application')
  }
}

/**
 *
 */
function Review (data, parent) {
  loadModels();

  if (data.application) {
    parent = data.application = new models.Application(data.application, parent._parent);
  }

  BaseModel.call(this, data, parent);
}

utils.initModel(Review, '/reviews', {}, BaseModel);

exports = module.exports = Review;
