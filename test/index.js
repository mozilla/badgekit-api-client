const client = require('./client');
const http = require('http');
const server = require('./server');

var badge = require('./fixtures/badge');

server.getAndReturn('/badges', {badges: [badge]});
server.getAndReturn('/badges/'+badge.slug, {badge: badge});
server.postAndReturn('/badges', );

client.getBadges(function (err, data) {
  console.log('Badges:', err, data);
});

client.getBadge('test-badge', function (err, data) {
  console.log('Badge:', err, data);
});

client.createBadge(badge, function (err, data) {
  console.log(err, data);
});