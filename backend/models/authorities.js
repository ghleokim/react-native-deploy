'use strict';
module.exports = (sequelize, DataTypes) => {
  const authorities = sequelize.define('authorities', {
    authority: DataTypes.STRING
  }, {});
  authorities.associate = function(models) {
    authorities.belongsTo(models.user);
  };
  return authorities;
};