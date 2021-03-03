export default (sequelize, DataTypes) => {
  const GeneralSettings = sequelize.define('GeneralSettings', {
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
    currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  GeneralSettings.associate = (models) => {
    GeneralSettings.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'generalSettings',
      onDelete: 'CASCADE'
    })
  }
  return GeneralSettings;
};