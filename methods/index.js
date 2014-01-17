const methodSets = [
  require('./systems'),
  require('./issuers'),
  require('./programs'),
  require('./badges'),
];

exports = module.exports = methodSets.reduce(function(methods, set) {
  Object.keys(set).forEach(function(method) {
    methods[method] = set[method];
  });
  return methods;
}, {});
