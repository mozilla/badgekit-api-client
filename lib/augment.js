const create = require('./create');

exports = module.exports = function augment (type) {
  const proto = require('../prototypes/' + type);

  return function (client, obj) {
    if (!obj)
      return obj;

    obj = create(proto, obj);
    Object.defineProperty(obj, 'client', {
      value: client
    });

    return obj;
  }
}
