function getSlug (issuer) {
  return '' + (issuer.slug || issuer);
}

exports.getIssuers = function getIssuers (callback) {
  const options = {
    path: '/issuers',
    filter: 'issuers',
    default: []
  };

  this.remote.get(options, callback);
}

exports.getIssuer = function getIssuer (issuer, callback) {
  const options = {
    path: '/issuers/' + getSlug(issuer)
  };

  this.remote.get(options, callback);
}

exports.createIssuer = function createIssuer (issuer, callback) {
  const options = {
    path: '/issuers',
    json: issuer,
    filter: 'status'
  };

  this.remote.post(options, callback);
}

exports.deleteIssuer = function deleteIssuer (issuer, callback) {
  const options = {
    path: '/issuers/' + getSlug(issuer),
    json: issuer,
    filter: 'status'
  };

  this.remote.del(options, callback);
}

exports.updateIssuer = function updateIssuer (issuer, callback) {
  const options = {
    path: '/issuers/' + getSlug(issuer),
    json: issuer,
    filter: 'status'
  };

  this.remote.put(options, callback);
}
