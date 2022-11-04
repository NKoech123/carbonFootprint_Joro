const fs = require("fs");
const filePath = './config/carbonWeights.json'
const carbonWeights = JSON.parse(fs.readFileSync(filePath));
const { Transaction, User } = require("./models");

const userID_isVegeterianMapping = async () =>{
  const users = await User.findAll();
  const userID_isVegeterianMapping = {}

  for (const user of users){
    userID_isVegeterianMapping[user.id] = user.isVegetarian
  }
  return userID_isVegeterianMapping
}

const calculateFootPrint = async (carbonWeightValue, transactionAmount, vegetarianFactor) => {
  let footprint_total = parseFloat(carbonWeightValue) * parseFloat(transactionAmount) 
  footprint_total *= vegetarianFactor
  return footprint_total

}

const getFootprint = async() => {

  let res, vegetarianFactor, footprint_total,obj
  vegetarianFactor = 1
  const transactions = await Transaction.findAll({order: [['transactionDate', 'ASC']]});
  const userID_isVegeterianMapper = await userID_isVegeterianMapping()
  
  res = {
    food: 0,
    goods_and_services: 0,
    home:0,
    transport: 0,
  }

  for (let {userId, carbonCategory, transactionAmount} of transactions) {
      carbonWeightValue = 0;
      if (carbonCategory !== "NO_CARBON_CATEGORY"){
        carbonWeightValue = carbonWeights[carbonCategory]
      }
      
      if (userID_isVegeterianMapper[userId]) {
        vegetarianFactor = 0.3
        console.log('User is Vegan!')
      }

      footprint_total = await calculateFootPrint(carbonWeightValue, 
          transactionAmount, 
          vegetarianFactor
        );
   
      res[carbonCategory] += footprint_total
   
    }
  
    return {footprint: {res}};
  }
getFootprint()

const getFootprintPerDayTransactionData = async() =>{

  let res, vegetarianFactor, footprint_total, resPerDay
  vegetarianFactor = 1
  const transactions = await Transaction.findAll({order: [['transactionDate', 'ASC']]});
  const userID_isVegeterianMapper = await userID_isVegeterianMapping()

  resPerDay = {
    transactionDate : {
      food: 0,
      goods_and_services: 0,
      home:0,
      transport: 0,
    }
 }

  for (let {userId, carbonCategory, transactionAmount, transactionDate} of transactions) {

      carbonWeightValue = 0;
      if (carbonCategory !== "NO_CARBON_CATEGORY"){
        carbonWeightValue = carbonWeights[carbonCategory]
      }
      
      if (userID_isVegeterianMapper[userId]) {
        vegetarianFactor = 0.3
        console.log('User is Vegan!')
      }

      footprint_total = await calculateFootPrint(carbonWeightValue, 
          transactionAmount, 
          vegetarianFactor
      );
  
      if (transactionDate in resPerDay){
        resPerDay[transactionDate][carbonCategory] += footprint_total
      } else {
        resPerDay[transactionDate] = {
          food: 0,
          goods_and_services: 0,
          home:0,
          transport: 0,
        }
        resPerDay[transactionDate][carbonCategory] += footprint_total
        
      }
    
  }
  res = []
  for (const [txtDate,footPrint] of Object.entries(resPerDay)){
    obj = {}
    if (txtDate === 'transactionDate'){
      continue
    }
    obj[txtDate] = footPrint
    res.push(obj)
  }
  console.log(res)
  return {footprintPerDay: res};
}
getFootprintPerDayTransactionData()

const getTransactions = async () => {
  const transactions = await Transaction.findAll({order: [['transactionDate', 'ASC']]});
  return {transactions: transactions};
}

module.exports = {
  getFootprint,
  getTransactions,
  getFootprintPerDayTransactionData
}
