const methodSets = [
  require('./badges'),
  require('./programs'),
  require('./issuers'),
];

exports = module.exports = methodSets.reduce(function(methods, set) {
  Object.keys(set).forEach(function(method) {
    methods[method] = set[method];
  });
  return methods;
}, {});
