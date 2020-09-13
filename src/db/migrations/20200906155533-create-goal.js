export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Goals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      goalName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      goalValue: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      totalSaved: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      timeline: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '',
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '',
      },
      completionRate: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      paused: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('Goals'),
};
