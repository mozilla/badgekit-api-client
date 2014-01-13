const restify = require('restify');

function Client (endpoint) {
  if (!(this instanceof Client))
    return new Client (endpoint);

  const client = restify.createJsonClient({
    url: endpoint
  });

  function remote (method, options, cb) {
    var args;
    var filter = options.filter;
    var def = options.default;
    var body = options.body;

    delete options.filter;
    delete options.default;
    delete options.body;

    function callback (err, req, res, data) {
      if (filter)
        data = (data||{})[filter];

      if (typeof cb === 'function')
        cb(err, data || def);
    }

    if (body) {
      args = [options, body, callback];
    } else {
      args = [options, callback];
    }

    client[method].apply(client, args);
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
    body: badge,
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
    body: badge,
    filter: 'status'
  };

  this.remote.put(options, callback);
}

exports = module.exports = Client;
