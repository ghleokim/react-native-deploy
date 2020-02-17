'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('truckSaleHistory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      predictedBeginTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      predictedEndTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      beginTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('truckSaleHistory');
  }
};