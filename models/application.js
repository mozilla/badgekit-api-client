const utils = require('../lib/modelUtils');

const BaseModel = require('./_base');
const Comment = require('./comment');
const Evidence = require('./evidence');

/**
 *
 */
function Application (data, parent) {
  BaseModel.apply(this, arguments);
}

Object.defineProperty(Application, 'pathIdentifier', {value: 'id'});

utils.initModel(Application, '/applications', {
  getEvidence: utils.getAllOfModelType(Evidence),
  getEvidenceItem: utils.getInstanceOfModelType(Evidence),
  addEvidence: utils.addInstanceOfModelType(Evidence),
  deleteEvidence: utils.deleteInstanceOfModelType(Evidence),
  addComment: utils.addInstanceOfModelType(Comment),
  deleteComment: utils.deleteInstanceOfModelType(Comment),
  approve: function approve (callback) {
    const options = {
      path: this._path + '/approve'
    };

    this._remote.post(options, callback);
  },
  deny: function deny (callback) {
    const options = {
      path: this._path + '/deny'
    };

    this._remote.post(options, callback);
  }
}, BaseModel);

exports = module.exports = Application;
