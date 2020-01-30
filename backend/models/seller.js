'use strict';
module.exports = (sequelize, DataTypes) => {
  const seller = sequelize.define('seller', {
    businessRegistrationNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  seller.associate = function(models) {
    seller.belongsTo(models.user);
    seller.belongsTo(models.truck);
  };
  return seller;
};