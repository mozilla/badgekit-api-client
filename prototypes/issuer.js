exports.save = function saveIssuer (callback) {
  this.client.updateIssuer(this, callback);
}
