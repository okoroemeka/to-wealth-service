'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionCategory.hasMany(models.BudgetModel, {
        foreignKey: "categoryId",
        as: "Budgets",
      });
      TransactionCategory.hasMany(models.Transaction, {
        foreignKey: "categoryId",
        as: "Transactions",
      });
      TransactionCategory.hasMany(models.Goal, {
        foreignKey: "category",
        as: "Goals",
      });
      TransactionCategory.belongsTo(models.User, {
        foreignKey: "userId",
        as: "transactionCategories",
        onDelete: "CASCADE",
      });
    }
  };
  TransactionCategory.init({
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Provide Category Name",
        },
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Provide Category Type",
        },
      },
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'TransactionCategory',
  });
  return TransactionCategory;
};