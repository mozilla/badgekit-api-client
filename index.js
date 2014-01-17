const methods = require('./methods')
const request = require('request');
const url = require('url');

function makeUrl (endpoint, path, query) {
  var uri = url.resolve(endpoint, path);
  if (query) {
    uri = url.parse(uri, true);
    uri.query = Object.keys(query).reduce(function (q, key) {
      return (q[key] = query[key], q);
    }, uri.query || {});
    delete uri.search;
    uri = url.format(uri);
  }
  return uri;
}

exports = module.exports = function makeClient (endpoint) {
  function remote (method, options, cb) {
    if (typeof options === 'string')
      options = {path: options};

    var filter = options.filter;
    var def = options.default;

    options.url = makeUrl(endpoint, options.path, options.query);
    options.json = options.json || {};

    delete options.filter;
    delete options.default;
    delete options.path;
    delete options.query;

    request[method](options, function (err, rsp, body) {
      if (typeof cb !== 'function')
        return;

      if (err) {
        return cb(err, null);
      }

      if (rsp.statusCode < 300) {
        if (filter)
          body = (body||{})[filter];
        cb(null, body || def);
      } else {
        // Handle errors
        // TODO - needs more work
        if (Object.keys(body).length)
          err = body;
        else
          err = {status: rsp.statusCode};

        cb(err, null);
      }
    });
  }

  ['get', 'head', 'post', 'put', 'del'].forEach(function (method) {
    remote[method] = remote.bind(remote, method);
  });

  var client = Object.keys(methods).reduce(function (obj, key) {
    Object.defineProperty(obj, key, {
      enumerable: true,
      value: methods[key]
    });
    return obj;
  }, {});

  Object.defineProperty(client, 'remote', {
    value: remote
  });

  return client;
}
