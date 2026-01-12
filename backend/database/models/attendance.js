'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      Attendance.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }

  Attendance.init(
    {
      userId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      checkIn: DataTypes.TIME,
      checkOut: DataTypes.TIME,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Attendance',
      tableName: 'attendances',
      freezeTableName: true
    }
  );

  return Attendance;
};
