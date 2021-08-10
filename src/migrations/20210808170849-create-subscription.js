module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plan_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'plans', key: 'id' },
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Subscriptions');
  },
};
