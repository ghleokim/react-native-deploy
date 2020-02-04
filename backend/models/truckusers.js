'use strict';
module.exports = (sequelize, DataTypes) => {
  const truckUsers = sequelize.define('truckUsers', {
    
  }, {});
  truckUsers.associate = function(models) {
    truckUsers.belongsTo(models.user, {
      foreignKey: "userEmail"
    });
    truckUsers.belongsTo(models.truck, {
      foreignKey: "truckId"
    });
  };
  return truckUsers;
};
