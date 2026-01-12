'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });

      User.hasMany(models.Attendance, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });

      User.hasMany(models.Leave, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }

  User.init(
    {
      employeeId: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',          
      freezeTableName: true        
    }
  );

  return User;
};
