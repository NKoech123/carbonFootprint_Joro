const chai  = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect }  = require("chai");
const { loadDataFromCSV  } = require("../loadData")

describe("loading and parsing csv data", function () {

  describe("loading and parsing csv data", function () {
    it("csv data should be converted to an array of objects", async function () {
        const transationData = await loadDataFromCSV();
        expect(transationData).to.be.an("array");
        expect(transationData[0]).to.be.an("object");
        expect(transationData[0].memo).to.equal('Memo 1');
        expect(transationData[0].amount).to.equal('45.92');
        expect(transationData[0].category1).to.equal('restaurants');
        expect(transationData[0].category2).to.equal('fast food');
      });

  });
})

