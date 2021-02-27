'use strict';
export default (sequelize, DataTypes) => {
  const Settings = sequelize.define(
    'Settings',
    {
      darkMode: DataTypes.BOOLEAN,
      language: DataTypes.STRING,
      country: DataTypes.STRING,
      currency: DataTypes.STRING,
      userId: DataTypes.STRING,
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
