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
  }, {});

  truckSaleHistory.associate = function(models) {
    truckSaleHistory.belongsTo(models.truck, {
      foreignKey:"truckId",
      onDelete: 'cascade'
    })
  };

  return truckSaleHistory;
};