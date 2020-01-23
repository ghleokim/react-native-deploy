'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('trucks', 'latitude', {
      type: Sequelize.FLOAT,
      allowNull: false
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('trucks', 'latitude');
  }
};
