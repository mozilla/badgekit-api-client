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

function Client (endpoint) {
  if (!(this instanceof Client))
    return new Client (endpoint);

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

  Object.defineProperty(this, 'remote', {
    value: remote
  });
}

Client.prototype.getBadges = function (callback) {
  const options = {
    path: '/badges',
    filter: 'badges',
    default: []
  };

  this.remote.get(options, callback);
}

Client.prototype.getAllBadges = function (callback) {
  const options = {
    path: '/badges',
    query: {archived: 'any'},
    filter: 'badges',
    default: []
  };

  this.remote.get(options, callback);
}

Client.prototype.getBadge = function (badge, callback) {
  const slug = badge.slug || badge.id || badge;
  const options = {
    path: '/badges/' + slug,
    filter: 'badge'
  };

  this.remote.get(options, callback);
}

Client.prototype.createBadge = function (badge, callback) {
  const options = {
    path: '/badges',
    json: badge,
    filter: 'status'
  };

  this.remote.post(options, callback);
}

Client.prototype.deleteBadge = function (badge, callback) {
  const slug = badge.slug || badge.id || badge;
  const options = {
    path: '/badges/' + slug,
    filter: 'status'
  };

  this.remote.del(options, callback);
}

Client.prototype.updateBadge = function (badge, callback) {
  const slug = badge.slug || badge.id;
  const options = {
    path: '/badges/' + slug,
    json: badge,
    filter: 'status'
  };

  this.remote.put(options, callback);
}

exports = module.exports = Client;
