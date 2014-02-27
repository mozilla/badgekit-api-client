const utils = require('../lib/modelUtils');

const Application = require('../models/Application');

exports.getApplications = function getApplications (context, callback) {
  utils.getContext(context, this, function (err, context) {
    if (err)
      return callback(err, null);

    const options = {
      path: context._path + Application.pathPart,
      filter: 'applications',
      default: [],
      generator: new utils.Generator(Application, context)
    };

    this._remote.get(options, callback);
  });
}

exports.getApplication = function getApplication (context, callback) {
  utils.getContext(context, this, 'Application', function (err, application) {
    if (err)
      return callback(err, null);
    
    application.load(callback);
  });
}

exports.addApplication = function addApplication (context, callback) {
  utils.getContext(context, this, 'Application', function (err, application) {
    if (err)
      return callback(err, null);

    application.create(callback);
  });
}

exports.getApplicationEvidence = function getApplicationEvidence (context, callback) {
  utils.getContext(context, this, 'Application', function (err, application) {
    if (err)
      return callback(err, null);

    application.getEvidence(callback);
  });
}

exports.getApplicationEvidenceItem = function getApplicationEvidenceItem (context, callback) {
  utils.getContext(context, this, 'Evidence', function (err, evidence) {
    if (err)
      return callback(err, null);

    evidence.load(callback);
  })
}
