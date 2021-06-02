'use strict';
export default (sequelize, DataTypes) => {
  const NetworthSettings = sequelize.define('NetworthSettings', {
    interestRate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monthlyIncome: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    savingType: {
      type: DataTypes.STRING,
      default: 'percentage',
      allowNull: true
    },
    savingValue: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});
  NetworthSettings.associate = function(models) {
    // associations can be defined here
    NetworthSettings.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'networthSettings',
      onDelete: 'CASCADE'
    })
  };
  return NetworthSettings;
};