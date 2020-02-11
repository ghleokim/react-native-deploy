'use strict';
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    content: {
      type: DataTypes.TEXT,
    },
    startRating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  review.associate = function(models) {
    review.belongsTo(models.truck, {
      foreignKey:"truckId",
      onDelete: 'cascade'
    });

    review.belongsTo(models.user, {
      foreignKey:"userEmail",
      onDelete: 'cascade'
    });

    review.hasMany(models.reply,{
      onDelete: 'cascade'
    });
  };
  return review;
};
