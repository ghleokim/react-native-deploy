'use strict';
module.exports = (sequelize, DataTypes) => {
  const reply = sequelize.define('reply', {
    content: {
      type: DataTypes.TEXT,
    },
  }, {});
  reply.associate = function(models) {
    reply.belongsTo(models.review, {
      foreignKey:"reviewId"
    });

    reply.belongsTo(models.user, {
      foreignKey:"userEmail"
    });

    reply.belongsTo(models.seller, {
      foreignKey:"sellerId"
    });
  };
  return reply;
};
