export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Budgets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    budget: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    actual: {
      type: Sequelize.DOUBLE,
      allowNull: true,
      defaultValue: 0.0
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Budgets')
};
