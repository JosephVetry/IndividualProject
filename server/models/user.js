'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserCourse, {foreignKey: 'UserId'})
    }
  }
  User.init({
    username: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Username is required'},
        notNull: {msg: 'Username is required'}
      }
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email must be unique'
      },
      validate: {
        notEmpty: {msg: 'Email is required'},
        notNull: {msg: 'Email is required'},
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Password is required'},
        notNull: {msg: 'Password is required'}
      }  
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((data, options) => {
    data.password = bcrypt.hashSync(data.password, 8)
  })
  return User;
};