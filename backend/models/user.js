'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt:{
      type: DataTypes.STRING
    },
    isSeller: {
      type: DataTypes.BOOLEAN
    },
  },
  // {
  //   timestamps: false,
  //   paranoid: true,
  //   charset: 'utf8',
  //   collate: 'utf8_general_ci',
  // }
  );
  user.associate = function(models) {
    user.hasMany(models.review);
    user.hasMany(models.reply);
    user.hasMany(models.truckUsers);
    user.hasMany(models.userTrucks);
  };

  return user;
};
