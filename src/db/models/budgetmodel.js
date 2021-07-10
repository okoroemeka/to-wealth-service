'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BudgetModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BudgetModel.belongsTo(models.User, {
        foreignKey: "userId",
        as: "budgets",
        onDelete: "CASCADE",
      });
      // BudgetModel.belongsTo(models.TransactionCategory, {
      //   foreignKey: "categoryId",
      //   as: "budgetsCategory",
      //   onDelete: "CASCADE",
      // });
    }
  };
  BudgetModel.init({
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    budget: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "provide budget amount",
        },
      },
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'BudgetModel',
  });
  return BudgetModel;
};