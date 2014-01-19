exports.getApplications = function getApplications (callback) {
  this.client.getBadgeApplications(this, callback);
}

exports.addApplication = function addApplication (application, callback) {
  this.client.addBadgeApplication(this, application, callback);
}
