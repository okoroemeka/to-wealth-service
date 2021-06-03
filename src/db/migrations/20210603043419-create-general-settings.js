'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GeneralSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      darkMode: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: false
      },
      language: {
        allowNull: true,
        type: Sequelize.STRING,
        default: "English",
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      countryCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('GeneralSettings');
  }
};