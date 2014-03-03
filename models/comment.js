const utils = require('../lib/modelUtils');

const BaseModel = require('./_base');

/**
 *
 */
function Comment (data, parent) {
  BaseModel.apply(this, arguments);
}

Object.defineProperty(Comment, 'pathIdentifier', {value: 'id'});

utils.initModel(Comment, '/comment', {}, BaseModel);

exports = module.exports = Comment;
