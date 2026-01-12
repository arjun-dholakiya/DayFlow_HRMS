'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }

  Profile.init(
    {
      userId: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      salary: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Profile',
      tableName: 'profiles',
      freezeTableName: true
    }
  );

  return Profile;
};
