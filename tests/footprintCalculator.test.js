const { expect }  = require("chai");
const { getFootprint, getTransactions } = require("../footprintCalculator");
const models = require("../models");

describe("footprintCalculator", function () {

  describe("getTransactions", function () {

    let testUser;
    let testTransaction1;
    let testTransaction2;

    beforeEach(async function () {
      testUser = await models.User.create({
        firstName: "Test",
        lastName: "Tesselate",
        email: "test@test.com"
      });
      testTransaction1 = await models.Transaction.create({
        userId: testUser.id,
        memo: "Test transaction 1",
        carbonCategory: "food",
        transactionAmount: 105.10,
        transactionDate: "2020-03-01"
      });
      testTransaction2 = await models.Transaction.create({
        userId: testUser.id,
        memo: "Test transaction 2",
        carbonCategory: "home",
        transactionAmount: 254.22,
        transactionDate: "2020-03-02"
      });
    });

    afterEach(async function () {
      await models.sequelize.truncate();
    });

    it("should return an array of transactions", async function () {
      const transactionsObject = await getTransactions();
      const transactions = transactionsObject.transactions;
      const transactionUser = await transactions[0].getUser();
      expect(transactions.length).to.equal(2);
      expect(transactions[0].memo).to.equal(testTransaction1.memo);
      expect(transactionUser.id).to.equal(testUser.id);
    });

  });
})
