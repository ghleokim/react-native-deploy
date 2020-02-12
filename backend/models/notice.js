'use strict';
module.exports = (sequelize, DataTypes) => {
  const notice = sequelize.define('notice', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  notice.associate = function(models) {
    notice.belongsTo(models.user, {
      foreignKey:"userEmail",
      onDelete: 'cascade'
    });
  };
  return notice;
};