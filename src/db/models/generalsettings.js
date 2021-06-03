'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GeneralSettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GeneralSettings.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'generalSettings',
        onDelete: 'CASCADE'
      })
    }
  };
  GeneralSettings.init({
    darkMode: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false
    },
    language: {
      allowNull: true,
      type: DataTypes.STRING,
      default: "English",
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'GeneralSettings',
  });
  return GeneralSettings;
};