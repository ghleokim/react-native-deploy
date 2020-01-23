'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('truckInfo', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    long:{
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  return truckInfo;
};
