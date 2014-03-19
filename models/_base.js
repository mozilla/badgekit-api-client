const utils = require('../lib/modelUtils');

/**
 *
 */
function BaseModel (data, parent) {
  var item = this;

  if (typeof data !== 'object') {
    var dataProperty = this.constructor.pathIdentifier || 'slug';
    var dataValue = data;
    data = {};
    data[dataProperty] = dataValue;
  }

  Object.keys(data).forEach(function (property) {
    Object.defineProperty(item, property, {
      enumerable: true,
      writable: true,
      value: data[property]
    });
  });

  Object.defineProperties(item, {
    _heritage: {
      get: function () {
        var heritage = {};
        var parent = this._parent;

        while (parent) {
          heritage[parent.constructor.name.toLowerCase() || 'client'] = parent;
          parent = parent._parent;
        }

        return heritage;
      }
    },
    _remote: {
      value: parent._remote
    },
    _parent: {
      value: parent
    },
    _path: {
      get: function () {
        return parent._path + this._getPathPart();
      }
    }
  });
}

function doAction (item, method, callback) {
  var filter = item.constructor.name;
  filter = filter.charAt(0).toLowerCase() + filter.substr(1);

  const options = {
    path: item._path,
    filter: filter,
    generator: new utils.Generator(item.constructor, item._parent)
  };

  item._remote[method](options, callback);
}

utils.initModel(BaseModel, {
  create: function createItem (callback) {
    var filter = this.constructor.name;
    filter = filter.charAt(0).toLowerCase() + filter.substr(1);

    const options = {
      path: this._parent._path + this.constructor.pathPart,
      data: this,
      filter: filter,
      generator: new utils.Generator(this.constructor, this._parent)
    }

    this._remote.post(options, callback);
  },
  load: function loadItem (callback) {
    doAction(this, 'get', callback);
  },
  save: function saveItem (callback) {
    var filter = this.constructor.name;
    filter = filter.charAt(0).toLowerCase() + filter.substr(1);

    const options = {
      path: this._path,
      data: this,
      filter: filter,
      generator: new utils.Generator(this.constructor, this._parent)
    }

    this._remote.put(options, callback);
  },
  delete: function deleteItem (callback) {
    doAction(this, 'delete', callback);
  },
  _getPathPart: function getItemPathPart () {
    throw new Error('`getPathPart` must be overridden by model');
  }
});

exports = module.exports = BaseModel;
