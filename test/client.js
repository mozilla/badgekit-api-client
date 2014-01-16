const Client = require('../');
const server = require('./server');

const client = new Client(server.endpoint);

exports = module.exports = client;
