'use strict';
module.exports = (sequelize, DataTypes) => {
  const reply = sequelize.define('reply', {
    content: {
      type: DataTypes.TEXT,
    },
  }, {});
  reply.associate = function(models) {
    reply.belongsTo(models.review, {
      foreignKey:"reviewId",
      onDelete: 'cascade'
    });

    reply.belongsTo(models.user, {
      foreignKey:"userEmail",
      onDelete: 'cascade'
    });

    reply.belongsTo(models.seller, {
      foreignKey:"sellerId",
      onDelete: 'cascade'
    });
  };
  return reply;
};
