'use strict';
module.exports = (sequelize, DataTypes) => {
  const truckSaleHistory = sequelize.define('truckSaleHistory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    predictedBeginTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    predictedEndTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    beginTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    area1: {
      allowNull: true,
      type: DataTypes.STRING
    },
    area2: {
      allowNull: true,
      type: DataTypes.STRING
    },
    area3: {
      allowNull: true,
      type: DataTypes.STRING
    }

  }, {});

  truckSaleHistory.associate = function(models) {
    truckSaleHistory.belongsTo(models.truck, {
      foreignKey:"truckId",
      onDelete: 'cascade'
    })
  };

  return truckSaleHistory;
};