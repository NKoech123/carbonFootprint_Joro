const chai  = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { User, sequelize, Sequelize } = require("../../models");

describe("User", function () {

  describe("create a User", function () {

    let testUser;

    before(function () {
      testUser = User.build({
        firstName: "Test",
        lastName: "Tesselate",
        email: "test@test.com"
      });

    });

    afterEach(async function () {
      await sequelize.truncate();
    });

    it("a valid User will get saved", async function () {
      const instance = await testUser.save();
      expect(instance.id).to.be.greaterThan(0);
    });

    it("a User without an email will not get saved", async function () {
      testUser.email = null;
      await expect(testUser.save()).to.be.rejectedWith(Sequelize.ValidationError);
    });

  });
})
