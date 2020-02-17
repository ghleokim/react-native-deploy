'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Order belongsTo Customer
    return queryInterface.addColumn(
      'truckSaleHistory', // name of Source model
      'truckId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'trucks', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'SET NULL',
      }
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'trucks', // name of Source model
      'truckId' // key we want to remove
    )
      .then(() => {
        // remove Payment hasOne Order
        return queryInterface.removeColumn(
          'trucks', // name of the Target model
          'truckId' // key we want to remove
        );
      });
  }
};
