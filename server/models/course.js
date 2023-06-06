'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.UserCourse, {foreignKey: 'CourseId'})
    }
  }
  Course.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Title is required'},
        notNull: {msg: 'Title is required'}
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'imgUrl is required'},
        notNull: {msg: 'imgUrl is required'}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Price is required'},
        notNull: {msg: 'Price is required'}
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Description is required'},
        notNull: {msg: 'Description is required'}
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};