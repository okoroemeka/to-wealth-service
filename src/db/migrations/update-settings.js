export default {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Settings', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        darkMode: {
          type: Sequelize.BOOLEAN,
          default: false
        },
        language: {
          type: Sequelize.STRING,
          default: 'English'
        },
        country: {
          type: Sequelize.STRING,
          default: 'Nigeria'
        },
        currency: {
          type: Sequelize.STRING,
          default: 'NGN'
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Settings');
    },
  };
  