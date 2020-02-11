'use strict';
module.exports = (sequelize, DataTypes) => {
  const truck = sequelize.define('truck', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
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
    longitude: DataTypes.FLOAT,
    state: DataTypes.STRING
  }, {});
  truck.associate = function(models) {
    truck.hasMany(models.menu,{onDelete: 'cascade'});
    truck.hasMany(models.review,{onDelete: 'cascade'});
    truck.hasMany(models.truckUsers,{onDelete: 'cascade'});
    truck.hasMany(models.userTrucks,{onDelete: 'cascade'});
    truck.belongsTo(models.sellers, {
      foreignKey: "email",
      onDelete: "cascade"
    });
  };
  
  return truck;
};