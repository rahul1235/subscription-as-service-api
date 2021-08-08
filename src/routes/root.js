// eslint-disable-next-line func-names
module.exports = async function (fastify) {
  // Declare a route

//   const { User } = fastify.sequelize();
  fastify.get('/', async (request, reply) => {
    // request.log.info(User.findOne());
    // fastify.logger(fastify.sequelize());
    return reply.send({ hello: '2world' });
  });
};
