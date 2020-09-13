export default (sequelize, DataTypes) => {
  const Goal = sequelize.define(
    'Goal',
    {
      goalName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please provide goal name',
          },
        },
      },
      goalValue: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please provide goal value',
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
            msg: 'Please provide goal timeline',
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
      },
      completionRate: {
        type: DataTypes.INTEGER,
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
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  Goal.associate = (models) => {
    // associations can be defined here
    Goal.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE',
    });
  };
  return Goal;
};
