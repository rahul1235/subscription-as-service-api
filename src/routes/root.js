const luxon = require('luxon');

// eslint-disable-next-line func-names
module.exports = async function (fastify) {
  // Declare a route

  const { User, Plan, Subscription } = fastify.sequelize();
  fastify.post('/users', async (request, reply) => {
    try {
      const { userName } = request.body;
      const userData = await User.create({
        user_name: userName,
      });
      return reply.send(userData);
    } catch (err) {
      return reply.status(500).send({ message: 'Something went wrong' });
    }
  });

  fastify.put('/users/:username', async (request, reply) => {
    try {
      const { username } = request.params;
      const userData = await User.findOne({
        where: {
          user_name: username,
        },
      });
      if (!userData) {
        return reply.status(400).send({ message: 'Invalid user' });
      }
      userData.save({
        user_name: username,
      });
      return reply.send({ message: 'user updated successfully' });
    } catch (err) {
      return reply.status(500).send({ message: 'Something went wrong' });
    }
  });

  fastify.delete('/users/:username', async (request, reply) => {
    try {
      const { username } = request.params;
      const userData = await User.findOne({
        where: {
          user_name: username,
        },
      });
      // Plan.bulkCreate([
      //   {
      //     plan_id: "FREE",
      //     validity_in_days: 'Infinity',
      //     cost: 0.0,
      //   },
      //   {
      //     plan_id: "TRIAL",
      //     validity_in_days: 7,
      //     cost: 0.0,
      //   },
      //   {
      //     plan_id: "LITE_1M",
      //     validity_in_days: 30,
      //     cost: 100,
      //   },
      //   {
      //     plan_id: "PRO_1M",
      //     validity_in_days: 30,
      //     cost: 200,
      //   },
      //   {
      //     plan_id: "LITE_6M",
      //     validity_in_days: 180,
      //     cost: 500,
      //   },
      // ])
      if (!userData) {
        return reply.status(400).send({ message: 'Invalid user' });
      }
      await userData.destroy();
      return reply.send({ message: 'user deleted successfully' });
    } catch (err) {
      return reply.status(500).send({ message: 'Something went wrong' });
    }
  });

  fastify.get('/subscription/:username/:date', async (request, reply) => {
    const { Op } = fastify.sequelize().Sequelize;
    const { username, date } = request.params;
    const whereFilter = {};
    const sqlDate = (luxon.DateTime.fromISO(date).toSQLDate());
    if (date) {
      whereFilter.start_date = {
        [Op.lte]: sqlDate,
      };
      whereFilter.end_date = {
        [Op.gte]: sqlDate,
      };
    }
    const userSubscriptions = await User.findOne({
      where: {
        user_name: username,
      },
      include: {
        model: Subscription,
        as: 'subscriptions',
        where: whereFilter,
        include: ['plan'],
      },
    });
    const dataToReturn = userSubscriptions.subscriptions.map((values) => {
      if (date) {
        return ({
          plan_id: values.plan.plan_id,
          days_left: luxon.DateTime.fromISO(values.end_date).diff(luxon.DateTime.now(), 'days').days,
        });
      }
      return ({
        plan_id: values.plan.plan_id,
        start_date: values.start_date,
        valid_til: values.end_date,
      });
    });
    reply.send(dataToReturn);
  });

  fastify.post('/subscription', async (request, reply) => {
    try {
      // eslint-disable-next-line camelcase
      const { user_name, plan_id, start_date } = request.body;
      const promises = [
        User.findOne({
          where: {
            user_name,
          },
        }),
        Plan.findOne({
          where: {
            plan_id,
          },
        }),
      ];
      const [userData, planData] = await Promise.all(promises);
      const subscriptionEndDate = luxon.DateTime.fromSQL(start_date).plus({
        days: planData.validity_in_days,
      }).toSQLDate();
      await Subscription.create({
        user_id: userData.id,
        plan_id: planData.id,
        start_date,
        end_date: subscriptionEndDate,
      });
      reply.send({
        status: 'SUCCESS',
        amount: planData.cost,
      });
    } catch (err) {
      reply.send(err);
    }
  });
};
