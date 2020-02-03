'use strict';
module.exports = (sequelize, DataTypes) => {
  const reply = sequelize.define('reply', {
    content: {
      type: DataTypes.TEXT,
    },
  }, {});
  reply.associate = function(models) {
    // associations can be defined here
  };
  return reply;
};
