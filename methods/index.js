const utils = require('../lib/modelUtils');

const methodSets = [
  require('./systems'),
  require('./issuers'),
  require('./programs'),
  require('./badges'),
  require('./claimCodes'),
  require('./issuing'),
  require('./assessment'),
];

exports = module.exports = methodSets.reduce(function(methods, set) {
  Object.keys(set).forEach(function(method) {
    methods[method] = set[method];
  });
  return methods;
}, {});
