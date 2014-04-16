const utils = require('../lib/modelUtils');

const BaseModel = require('./_base');

/**
 *
 */
function Instance (data, parent) {
  BaseModel.apply(this, arguments);
}

Object.defineProperty(Instance, 'pathIdentifier', {value: 'email'});

utils.initModel(Instance, '/instances', {
  create: function create (code, callback) {
    var filter = this.constructor.name;
    filter = filter.charAt(0).toLowerCase() + filter.substr(1);

    var data = this;
    data.claimCode = code;
    
    const options = {
      path: this._parent._path + this.constructor.pathPart,
      data: data,
      filter: filter,
      generator: new utils.Generator(this.constructor, this._parent)
    }

    this._remote.post(options, callback);
  }
}, BaseModel);


exports = module.exports = Instance;
