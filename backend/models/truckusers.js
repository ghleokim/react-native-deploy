'use strict';
module.exports = (sequelize, DataTypes) => {
  const truckUsers = sequelize.define('truckUsers', {
    
  }, {});
  truckUsers.associate = function(models) {
    truckUsers.belongsTo(models.user, {
      foreignKey: "userEmail",
      onDelete: 'cascade'
    });
    truckUsers.belongsTo(models.truck, {
      foreignKey: "truckId",
      onDelete: 'cascade'
    });
  };
  return truckUsers;
};
