const chai  = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { Transaction, User, sequelize, Sequelize } = require("../../models");
const carbonWeights = require('../../config/carbonWeights.json');

describe("Transaction", function () {

  let testUser;
  let testTransaction;

  beforeEach(async function () {
    testUser = await User.create({
      firstName: "Test",
      lastName: "Tesselate",
      email: "test@test.com"
    });
    testTransaction = Transaction.build({
      userId: testUser.id,
      memo: "Test transaction",
      carbonCategory: "food",
      transactionAmount: 105.10,
      transactionDate: "2020-03-01"
    });
  });

  afterEach(async function () {
    await sequelize.truncate();
  });

  describe("create a Transaction", function () {

    it("a valid Transaction will get saved", async function () {
      const instance = await testTransaction.save();
      const instanceUser = await instance.getUser();
      expect(instance.id).to.be.greaterThan(0);
      expect(instanceUser.id).to.equal(testUser.id);
    });

    it("a Transaction without a memo will not get saved", async function () {
      testTransaction.memo = null;
      await expect(testTransaction.save()).to.be.rejectedWith(Sequelize.ValidationError);
    });

    it("a Transaction without a carbonCategory will not get saved", async function () {
      testTransaction.carbonCategory = null;
      await expect(testTransaction.save()).to.be.rejectedWith(Sequelize.ValidationError);
    });

    it("a Transaction without a transactionAmount will not get saved", async function () {
      testTransaction.transactionAmount = null;
      await expect(testTransaction.save()).to.be.rejectedWith(Sequelize.ValidationError);
    });

    it("a Transaction without a transactionDate will not get saved", async function () {
      testTransaction.transactionDate = null;
      await expect(testTransaction.save()).to.be.rejectedWith(Sequelize.ValidationError);
    });

  });

  describe("carbonAmount", function () {

    it("should calculate the correct carbon amount for a food transaction", function () {
      const carbonCategory = "food";
      testTransaction.carbonCategory = carbonCategory;
      const carbonAmount = testTransaction.transactionAmount * carbonWeights[carbonCategory];
      expect(testTransaction.carbonAmount()).to.equal(parseFloat(carbonAmount.toFixed(2)));
    });

    it("should calculate the correct carbon amount for a goods_and_services transaction", function () {
      const carbonCategory = "goods_and_services";
      testTransaction.carbonCategory = carbonCategory;
      const carbonAmount = testTransaction.transactionAmount * carbonWeights[carbonCategory];
      expect(testTransaction.carbonAmount()).to.equal(parseFloat(carbonAmount.toFixed(2)));
    });

    it("should calculate the correct carbon amount for a home transaction", function () {
      const carbonCategory = "home";
      testTransaction.carbonCategory = carbonCategory;
      const carbonAmount = testTransaction.transactionAmount * carbonWeights[carbonCategory];
      expect(testTransaction.carbonAmount()).to.equal(parseFloat(carbonAmount.toFixed(2)));
    });

    it("should calculate the correct carbon amount for a transport transaction", function () {
      const carbonCategory = "transport";
      testTransaction.carbonCategory = carbonCategory;
      const carbonAmount = testTransaction.transactionAmount * carbonWeights[carbonCategory];
      expect(testTransaction.carbonAmount()).to.equal(parseFloat(carbonAmount.toFixed(2)));
    });

  });

})
