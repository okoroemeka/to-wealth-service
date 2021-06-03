'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class NetworthSettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NetworthSettings.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'networthSettings',
        onDelete: 'CASCADE'
      })
    }
  };
  NetworthSettings.init({
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
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'NetworthSettings',
  });
  return NetworthSettings;
};