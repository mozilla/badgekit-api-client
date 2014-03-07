const server = require('badgekit-api');
const db = require('../node_modules/badgekit-api/app/lib/db');
const fs = require('fs');
const path = require('path');

function loadDatabase (callback) {
  const lines = Buffer.concat([
    fs.readFileSync(path.join(__dirname, '..', 'node_modules/badgekit-api/schema.sql')),
    fs.readFileSync(path.join(__dirname, '..', 'node_modules/badgekit-api/test/test-data.sql')),
  ]).toString('utf8')
    .trim()
    .split(';')
    .map(function (s) {return s.trim()})
    .filter(Boolean);

  (function next(i) {
    const sql = lines[i]
    if (!sql)
      return callback();

    db.query(sql, function (err) {
      if (err)
        return callback(err);

      return next(++i);
    })

  })(0);
}

var listen = server.listen.bind(server);
server.listen = function (port, callback) {
  loadDatabase(function (err) {
    if (err)
      return callback(err);

    listen.call(server, port, callback);
  });
}

var close = server.close.bind(server);
server.close = function () {
  db.close();
  close();
}

exports = module.exports = server;
