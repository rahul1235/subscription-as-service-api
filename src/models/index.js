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

const db = {
  User,
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
