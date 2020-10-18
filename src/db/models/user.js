import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please provide first name',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email address is already registered',
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'Please provide email address',
          },
          isEmail: {
            args: true,
            msg: 'Email address is invalid',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isByteLength: {
            args: 8,
            msg: 'Password must be at least 8 characters long',
          },
          isAlphanumeric(value) {
            value = value.trim();
            if (
              !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(
                value
              )
            ) {
              throw new Error(
                'Password should be alphanumeric and more than 7 characters e.g. abc123@'
              );
            }
          },
        },
      },
      position: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      googleid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      facebookid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: {
            args: true,
            msg: 'Invalid image format',
          },
        },
      },
      emailtoken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emailNotifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
      appNotifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCreate(user) {
          const rawPassword = user.password;
          user.password = bcrypt.hashSync(rawPassword, 10);
        },
        beforeUpdate(user) {
          const rawPassword = user.password;
          user.password = bcrypt.hashSync(rawPassword, 10);
        },
      },
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Goal, { foreignKey: 'userId', as: 'Goals' });
  };
  return User;
};
