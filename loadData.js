const fs = require("fs");
const csvFilePath = './transactions_to_import.csv';
const { Transaction } = require("./models");

const loadDataFromCSV = async () => {
    
    arrObj = []

    const csvFile = fs.readFileSync(csvFilePath)
    const csvData = csvFile.toString()  

    const lines = csvData.split('\n')
    const headers = lines[0].split(',')
    headers[5] = 'date' //take care of stubborn regex

    for (i=1; i<lines.length-1; i++){
        var rowData = lines[i].split(',');
        arrObj[i] = {};
        for (var j=0; j < rowData.length; j++){
            //take care of stubborn regex
            if (j==5){
                arrObj[i][headers[j]] = rowData[j].slice(0,10);
            }else{
                arrObj[i][headers[j]] = rowData[j];
            }
        }
    }

    return arrObj.slice(1)
  }


const insertTransactions = async () => {

    let userId, memo, transactionAmount , carbonCategory, transactionDate
  
    const transationData = await loadDataFromCSV();
    console.log(transationData)
    const txtCategoryCustomMappingRules = {
      gasoline: "transport",
      flight: "transport",
      bus: "transport",
      home: "home",
      online: "home",
      entertainment: "home",
      fast_food: "food",
      food: "food",
      coffee: "food",
      goods_and_services: "goods_and_services",
      bank_charge: "goods_and_services",
      clothes: "goods_and_services",
      shop: "goods_and_services",
      furniture: "goods_and_services",
      grocery: "goods_and_services",
      general: "home",
      financial: "goods_and_services",
    }
  
    try {
        let external_transactions = []
        for (const txtData of transationData){
            userId = txtData.userId
            memo = txtData.memo
            if (txtData.category2 !== 'undefined'){
              if (txtData.category2 == 'fast food'){
                carbonCategory = txtCategoryCustomMappingRules['fast_food']
              }else if (txtData.category2== 'bank charge'){
                carbonCategory = txtCategoryCustomMappingRules['bank_charge']
              }else{
                carbonCategory = txtCategoryCustomMappingRules[txtData.category2]
              }
           }else{
             carbonCategory = 'NO_CARBON_CATEGORY'
           }
        
            transactionAmount = txtData.amount
            transactionDate = txtData.date
          
            const txt = await Transaction.create({ userId, memo, carbonCategory, transactionAmount,transactionDate})
            external_transactions.push(txt)
        }
    
        return {dataFromExternalFinancialSources: external_transactions}
        
      }catch (err) {
          console.log(err)
        }
  }

 module.exports = {
    loadDataFromCSV, 
    insertTransactions
  }
  