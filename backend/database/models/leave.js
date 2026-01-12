'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Leave extends Model {
    static associate(models) {
      Leave.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }

  Leave.init(
    {
      userId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: DataTypes.STRING,
      remarks: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Leave',
      tableName: 'leaves',
      freezeTableName: true
    }
  );

  return Leave;
};
