exports.save = function saveSystem (callback) {
  this.client.updateSystem(this, callback);
}
