'use strict';
module.exports = (sequelize, DataTypes) => {
  const truck = sequelize.define('truck', {
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
    }
  }, {});
  truck.associate = function(models) {
    // associations can be defined here
  };
  return truck;
};