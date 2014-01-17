function getSlug (badge) {
  return '' + (badge.slug || badge);
}

exports.getBadges = function getBadges (callback) {
  const options = {
    path: '/badges',
    filter: 'badges',
    default: []
  };

  this.remote.get(options, callback);
}

exports.getAllBadges = function getAllBadges (callback) {
  const options = {
    path: '/badges',
    query: {archived: 'any'},
    filter: 'badges',
    default: []
  };

  this.remote.get(options, callback);
}

exports.getBadge = function getBadge (badge, callback) {
  const options = {
    path: '/badges/' + getSlug(badge),
    filter: 'badge'
  };

  this.remote.get(options, callback);
}

exports.createBadge = function createBadge (badge, callback) {
  const options = {
    path: '/badges',
    json: badge,
    filter: 'status'
  };

  this.remote.post(options, callback);
}

exports.deleteBadge = function deleteBadge (badge, callback) {
  const options = {
    path: '/badges/' + getSlug(badge),
    filter: 'status'
  };

  this.remote.del(options, callback);
}

exports.updateBadge = function updateBadge (badge, callback) {
  const options = {
    path: '/badges/' + getSlug(badge),
    json: badge,
    filter: 'status'
  };

  console.log(options);
  this.remote.put(options, callback);
}
