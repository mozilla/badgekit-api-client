const methodSets = [
  require('./systems'),
  require('./issuers'),
  require('./programs'),
  require('./badges'),
  require('./assessment'),
  require('./claims'),
  require('./issuing'),
];

exports = module.exports = methodSets.reduce(function(methods, set) {
  Object.keys(set).forEach(function(method) {
    methods[method] = set[method];
  });
  return methods;
}, {});
