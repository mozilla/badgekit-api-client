const clientPrototype = require('../methods');

var Client = function (remote) {
  if (!(this instanceof Client))
    return new Client(remote);

  Object.defineProperties(this, {
    '_remote': {
      value: remote
    },
    '_path': {
      value: ''
    }
  });
}

Client.prototype = Object.create(clientPrototype);
Client.prototype.constructor = Client;

exports = module.exports = Client;
