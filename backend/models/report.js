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
    // associations can be defined here
  };
  return report;
};