'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      memo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      carbonCategory: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['food', 'home', 'goods_and_services', 'transport']
      },
      transactionAmount: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      transactionDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};
