const crypto = require('crypto');
const formatString = require('util').format;
const fs = require('fs');
const http = require('http');
const jws = require('jws');
const mime = require('mime');
const request = require('request');
const url = require('url');
const utils = require('./modelUtils');

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
  return uri.replace(/\(/g, '%28').replace(/\)/g, '%29');
}

function errorNameFromStatusCode (code) {
  var status = http.STATUS_CODES[parseInt(code, 10)];

  if (!status)
    return null;

  var name = status.split(/\s+/).reduce(function(name, part) {
    name += part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    return name;
  }, '').replace(/\W+/g, '');

  if (!/Error$/.test(name))
    name += 'Error';

  return name;
}

function fixError (res, body) {
  var errName = body.code || (body.error ? body.error.code : '');
  var errMsg = body.message || (body.error ? body.error.message : '') || '';

  if (errName) {
    if (!/Error$/.test(errName))
      errName += 'Error';
  } else {
    errName = errorNameFromStatusCode(res.statusCode) || 'Http' + res.statusCode + 'Error';
  }

  var err = new Error(errMsg);
  Object.defineProperties(err, {
    code: {value: res.statusCode},
    name: {value: errName},
    details: {value: body.details}
  });

  return err;
}

function encodeDataItem (key, value) {
  if (key === 'image' && /^[\/\.]/.test(value)) {
    value = {
      path: value,
      type: mime.lookup(value)
    };
  }

  if (value && value.type && (value.path || value.data)) {
    var data = (value.data || fs.readFileSync(value.path)).toString('base64');
    value = formatString('data:%s;base64,%s', value.type, data);
  }

  return value;
}

function signRequest (req, auth) {
  if (typeof auth === 'string')
    auth = {secret: auth};

  var key = auth.key || 'master';
  var secret = auth.secret;

  var data = {
    header: {typ: 'JWT', alg: 'HS256'},
    payload: {
      key: key,
      exp: Date.now() + (1000 * 60),
      method: req.method.toUpperCase(),
      path: url.parse(req.url).path
    },
    secret: secret
  };

  if (req.body) {
    data.payload.body = {
      alg: 'SHA256',
      hash: crypto.createHash('SHA256').update(req.body).digest('hex')
    }
  }

  req.headers['Authorization'] = 'JWT token="' + jws.sign(data) + '"';

  return req;
}

function Remote (endpoint, auth) {
  if (!(this instanceof Remote))
    return new Remote(endpoint, auth);

  function makeCall (method, meta, cb) {
    if (typeof meta === 'string')
      meta = {path: meta};

    var filter = meta.filter;
    var defaultValue = meta.default;
    var generator = meta.generator;

    var config = {
      url: makeUrl(endpoint, meta.path, meta.query),
      method: method,
      headers: {
        'User-Agent': 'BadgeKit API Client',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    if (meta.data) {
      config.body = JSON.stringify(meta.data, encodeDataItem);
    }

    var call = request(signRequest(config, meta.auth || auth), function (err, rsp, body) {
      if (typeof cb !== 'function')
        return;

      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (e) {
          // NO-OP - leave body as is
        }
      }

      if (err) {
        if (err.name === 'Error')
          Object.defineProperty(err, 'name', {value: 'HttpError'});
        return cb(err, null);
      }

      if (rsp.statusCode >= 400) {
        cb(fixError(rsp, body), null);
      } else {
        body = generator.preformat(body);

        if (filter)
          body = (body||{})[filter];

        if (typeof body === 'undefined')
          body = defaultValue;

        if (generator)
          body = generator(body);

        cb(null, body);
      }
    });
  }

  ['get', 'head', 'post', 'put', 'delete'].forEach(function (method) {
    Object.defineProperty(this, method, {
      enumerable: true,
      value: makeCall.bind(this, method)
    });
  }.bind(this));

}

exports = module.exports = Remote;
