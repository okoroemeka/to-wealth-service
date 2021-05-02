'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GoalModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        allowNull: false,
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
      completionRate: {
        type: Sequelize.DOUBLE,
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
      category: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('GoalModels');
  }
};