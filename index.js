const Client = require('./lib/client');
const Remote = require('./lib/remote');

exports = module.exports = function makeClient (endpoint, auth) {
  var remote = new Remote(endpoint, auth);
  var client = new Client(remote);
  return client;
}
