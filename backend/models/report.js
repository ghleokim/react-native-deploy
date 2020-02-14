'use strict';
module.exports = (sequelize, DataTypes) => {
  const report = sequelize.define('report', {
    userEmail: DataTypes.STRING,
    category: DataTypes.INTEGER,
    content: DataTypes.STRING,
    division: DataTypes.INTEGER,
    targetId: DataTypes.INTEGER,
    original: DataTypes.TEXT
  }, {});
  report.associate = function(models) {
    report.belongsTo(models.user, {
      foreignKey:"userEmail",
      onDelete: 'cascade'
    });
    report.belongsTo(models.truck, {
      foreignKey:"truckId",
      onDelete: 'cascade'
    });
  };
  return report;
};