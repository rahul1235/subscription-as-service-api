const fp = require('fastify-plugin');
const db = require('../models/index');
// eslint-disable-next-line no-unused-vars
module.exports = fp(async (fastify, opts) => {
  fastify.decorate('sequelize', () => db);
});
