'use strict';
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    content: {
      type: DataTypes.TEXT,
    },
    startLating: {
      type: DataTypes.FLOAT,
    },
  }, {});
  review.associate = function(models) {
    // associations can be defined here
  };
  return review;
};
