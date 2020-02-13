'use strict';
module.exports = (sequelize, DataTypes) => {
  const openingHours = sequelize.define('openingHours', {
    beginTime: DataTypes.STRING,
    endTime: DataTypes.STRING
  }, {});
  openingHours.associate = function(models) {
    openingHours.belongsTo(models.truck, {
      foreignKey:"truckId",
      onDelete: 'cascade'
    })
  };
  return openingHours;
};