'use strict';
export default (sequelize, DataTypes) => {
  const Settings = sequelize.define(
    'Settings',
    {
      darkMode: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      language: {
        type: DataTypes.STRING,
        default: 'English',
      },
      country: {
        type: DataTypes.STRING,
        default: 'Nigeria'
      },
      currency: {
        type: DataTypes.STRING,
        default: 'NGN'
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Settings.associate = (models) => {
    // associations can be defined here
    Settings.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'generalSettings',
      onDelete: 'CASCADE',
    });
  };
  return Settings;
};
