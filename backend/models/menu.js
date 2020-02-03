'use strict';
module.exports = (sequelize, DataTypes) => {
  const menu = sequelize.define('menu', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    truckId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT
    },
    imgURL: DataTypes.STRING,
    isSoldOut: {
      type: DataTypes.BOOLEAN
    },
  }, {});
  menu.associate = function(models) {
    menu.belongsTo(models.truck, {
      foreignKey:"truckId"
    })
  };
  return menu;
};
