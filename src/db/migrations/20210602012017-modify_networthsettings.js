'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        'NetworthSettings',
        'savingType',
        {
          type: Sequelize.STRING,
          default: 'percentage',
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'NetworthSettings',
        'savingValue',
        {
          type: Sequelize.INTEGER,
          default: 'percentage',
          allowNull: true
        }
      ),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('NetworthSettings', 'savingType'),
      queryInterface.removeColumn('NetworthSettings', 'savingValue'),
    ])
  }
};
