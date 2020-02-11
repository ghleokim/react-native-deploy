'use strict';
module.exports = (sequelize, DataTypes) => {
  const seller = sequelize.define('seller', {
    businessRegistrationNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  seller.associate = function(models) {
    seller.belongsTo(models.user,{
      onDelete: 'cascade'
    });
    seller.hasMany(models.reply, {
      onDelete: 'cascade'
    });
    // seller.belongsToMany(models.truck, {through: 'sellerTrucks'});
  };
  return seller;
};
