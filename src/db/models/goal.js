"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Goal.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author',
        onDelete: 'CASCADE',
      });
      Goal.belongsTo(models.TransactionCategory, {
        foreignKey: 'category',
        as: 'goals',
        onDelete: 'CASCADE',
      });
    }
  }
  Goal.init(
    {
      goalName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please provide goal name",
          },
        },
      },
      goalValue: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please provide goal value",
          },
        },
      },
      totalSaved: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
      timeline: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please provide goal timeline",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      completionRate: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      paused: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Goal",
    }
  );
  return Goal;
};
