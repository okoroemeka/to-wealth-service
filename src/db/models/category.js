'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Budget, {
        foreignKey: "categoryId",
        as: "Budgets",
      });
      Category.hasMany(models.Transaction, {
        foreignKey: "categoryId",
        as: "Transactions",
      });
      Category.belongsTo(models.User, {
        foreignKey: "userId",
        as: "categories",
        onDelete: "CASCADE",
      });
    }
  };
  Category.init({
    userId: {
      type: DataTypes.INTEGER,
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
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
