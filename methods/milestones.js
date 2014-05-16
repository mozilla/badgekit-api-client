const utils = require('../lib/modelUtils');

const Milestone = require('../models/milestone');

exports.getMilestones = function getMilestones (context, callback) {
  utils.getContext(context, this, 'System', function (err, system) {
    if (err)
      return callback(err, null);

    const options = {
      path: system._path + Milestone.pathPart,
      filter: 'milestones',
      default: [],
      generator: new utils.Generator(Milestone, system)
    };

    this._remote.get(options, callback);
  }.bind(this));
}

function doMilestoneAction(context, client, action, callback) {
  utils.getContext(context, client, 'Milestone', function (err, milestone) {
    if (err)
      return callback(err, null);

    milestone[action](callback);
  });
}

exports.getMilestone = function getMilestone (context, callback) {
  doMilestoneAction(context, this, 'load', callback);
}

exports.createMilestone = function createMilestone (context, callback) {
  doMilestoneAction(context, this, 'create', callback);
}

exports.deleteMilestone = function deleteMilestone (context, callback) {
  doMilestoneAction(context, this, 'delete', callback);
}

exports.updateMilestone = function updateMilestone (context, callback) {
  doMilestoneAction(context, this, 'save', callback);
}
