'use strict';
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    content: {
      type: DataTypes.TEXT,
    },
    startLating: {
      type: DataTypes.FLOAT,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  review.associate = function(models) {
    review.belongsTo(models.truck, {
      foreignKey:"truckId"
    });

    review.belongsTo(models.user, {
      foreignKey:"userEmail"
    });

    review.hasMany(models.reply);

  };
  return review;
};
