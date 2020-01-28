'use strict';
module.exports = (sequelize, DataTypes) => {
  const menu = sequelize.define('menu', {
    menuID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    truckID: {
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
    imgURL: DataTypes.STRING
  }, {});
  menu.associate = function(models) {
    menu.belongsTo(models.truck,{
      foreignKey:"truckID"
    })
  };
  return menu;
};
