const Client = require('..');
const server = require('./server');

exports = module.exports = function (cb) {
  var port = 0;

  server.listen(port, function (err) {
    if (err)
      throw err;

    var client = new Client(server.url, {key: 'key', secret: 'secret'});
    client.done = function () {
      server.close();
    }

    cb(client);
  });
}
