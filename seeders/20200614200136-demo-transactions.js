'use strict';

module.exports = {
  up: async (queryInterface) => {
    const userIds = await queryInterface.sequelize.query(
      `SELECT id from Users;`
    );
    const transactionData = [];
    const transaction1 = {
      memo: "Food transaction",
      carbonCategory: "food",
      transactionAmount: 105.10,
      transactionDate: new Date("2020-03-01"),
      userId: userIds[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    transactionData.push(transaction1);
    const transaction2 = {
      memo: "Home transaction",
      carbonCategory: "home",
      transactionAmount: 88.65,
      transactionDate: new Date("2020-03-02"),
      userId: userIds[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()

    }
    transactionData.push(transaction2);
    const transaction3 = {
      memo: "Food transaction",
      carbonCategory: "food",
      transactionAmount: 35.86,
      transactionDate: new Date("2020-03-02"),
      userId: userIds[0][1].id,
      createdAt: new Date(),
      updatedAt: new Date()

    }
    transactionData.push(transaction3);
    const transaction4 = {
      memo: "Good and services transaction",
      carbonCategory: "goods_and_services",
      transactionAmount: 350.99,
      transactionDate: new Date("2020-03-01"),
      userId: userIds[0][1].id,
      createdAt: new Date(),
      updatedAt: new Date()

    }
    transactionData.push(transaction4);

    return await queryInterface.bulkInsert('Transactions', transactionData, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Transactions', null, {});

  }
};
