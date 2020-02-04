'use strict';
module.exports = (sequelize, DataTypes) => {
  const userTrucks = sequelize.define('userTrucks', {
    
  }, {});
  userTrucks.associate = function(models) {
    userTrucks.belongsTo(models.user, {
      foreignKey: "userEmail"
    });
    userTrucks.belongsTo(models.truck, {
      foreignKey: "truckId"
    });
  };
  return userTrucks;
};