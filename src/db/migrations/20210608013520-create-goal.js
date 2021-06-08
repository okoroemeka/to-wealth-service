'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Goals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      goalName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      goalValue: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      totalSaved: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      completionRate: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      paused: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      category: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Goals');
  }
};