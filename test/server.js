const endpoint = 'http://test.badgekit.org';
const nock = require('nock');

var server = nock(endpoint);

function mockAndReturn (method, path, response, code) {
  return server[method](path)
    .reply(code || 200, response);
}

exports = module.exports = server;
exports.endpoint = endpoint;
exports.getAndReturn = mockAndReturn.bind(null, 'get');
exports.postAndReturn = mockAndReturn.bind(null, 'post');
exports.putAndReturn = mockAndReturn.bind(null, 'put');
exports.deleteAndReturn = mockAndReturn.bind(null, 'delete');
