export default (sequelize, DataTypes) => {
  const Budget = sequelize.define('Budget', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please provide category'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please provide budget description'
        }
      }
    },
    budget: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'provide budget amount'
        }
      }
    },
    actual: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0.0,
    }
  });
  Budget.associate = (models) => {
    // associations can be defined here
    Budget.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'budgets',
      onDelete: 'CASCADE',
    });
  };
  return Budget;
};
