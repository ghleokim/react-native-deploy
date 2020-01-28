'use strict';
module.exports = (sequelize, DataTypes) => {
  const truck = sequelize.define('truck', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imgURL: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {});
  truck.associate = function(models) {
    truck.hasMany(models.menu)
  };
  return truck;
};