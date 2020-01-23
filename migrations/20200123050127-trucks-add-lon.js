'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('trucks', 'longitude', {
      type: Sequelize.FLOAT,
      allowNull: false
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('trucks', 'longitude');
  }
};
