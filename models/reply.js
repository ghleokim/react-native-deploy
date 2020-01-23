'use strict';
module.exports = (sequelize, DataTypes) => {
  const reply = sequelize.define('reply', {
    postID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
  }, {});
  reply.associate = function(models) {
    // associations can be defined here
  };
  return reply;
};
