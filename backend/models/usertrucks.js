'use strict';
module.exports = (sequelize, DataTypes) => {
  const userTrucks = sequelize.define('userTrucks', {
    
  }, {});
  userTrucks.associate = function(models) {
    userTrucks.belongsTo(models.user, {
      foreignKey: "userEmail",
      onDelete: 'cascade'
    });
    userTrucks.belongsTo(models.truck, {
      foreignKey: "truckId",
      onDelete: 'cascade'
    });
  };
  return userTrucks;
};