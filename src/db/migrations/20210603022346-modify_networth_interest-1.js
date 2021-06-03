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
     queryInterface.changeColumn("NetworthSettings", "savingValue", {
      type: Sequelize.DECIMAL,
      allowNull: true,
    }),])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([
      queryInterface.changeColumn("NetworthSettings", "savingValue", {
       type: Sequelize.INTEGER,
       allowNull: true,
     }),])
  }
};
