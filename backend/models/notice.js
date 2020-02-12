'use strict';
module.exports = (sequelize, DataTypes) => {
  const notice = sequelize.define('notice', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    state: DataTypes.BOOLEAN
  }, {});
  notice.associate = function(models) {
    notice.belongsTo(models.user, {
      foreignKey:"userEmail",
      onDelete: 'cascade'
    });
  };
  return notice;
};