const Sequelize = require('sequelize');

const {
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_HOST,
} = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
});
const User = require('./user')(sequelize, Sequelize.DataTypes);
const Plan = require('./plan')(sequelize, Sequelize.DataTypes);
const Subscription = require('./subscription')(sequelize, Sequelize.DataTypes);

User.hasMany(Subscription, {
  foreignKey: 'user_id',
  as: 'subscriptions',
  onDelete: 'cascade',
});

Subscription.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
  onDelete: 'cascade',
});

Subscription.belongsTo(Plan, {
  foreignKey: 'plan_id',
  as: 'plan',
});

Plan.hasMany(Subscription, {
  foreignKey: 'plan_id',
  as: 'subscriptions',
  onDelete: 'cascade',
});

const db = {
  User,
  Plan,
  Subscription,
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
