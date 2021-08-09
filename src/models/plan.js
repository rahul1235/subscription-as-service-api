const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // }
  }
  Plan.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    plan_id: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    validity_in_days: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cost: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
  }, {
    sequelize,
    modelName: 'Plan',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Plan;
};
