const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // }
  }
  Subscription.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    plan_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    start_date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    end_date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
  }, {
    sequelize,
    modelName: 'Subscription',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Subscription;
};
