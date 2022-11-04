const express = require('express');
const app = express();
const port = 3000;
const { getFootprint, getTransactions, getFootprintPerDayTransactionData } = require("./footprintCalculator");
const {insertTransactions} = require("./loadData")
const { Transaction } = require("./models");

app.get('/insertTransactions', async (req, res) => {
  try{
    const transationData = await insertTransactions();
    return res.json(transationData);
  }catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
});

app.get('/footprint', async(req, res) => {
  try{
  const footprintObject = await getFootprint();
  res.json(footprintObject);
}catch(err){
  console.log(err)
  return res.status(500).json(err)
}
});

app.get('/footprintPerDay', async(req, res) => {
  try{
  const footprintPerDayObject = await getFootprintPerDayTransactionData();
  res.json(footprintPerDayObject);
}catch(err){
  console.log(err)
  return res.status(500).json(err)
}
});

app.get('/transactions', async (req, res) => {
  try{
  const transactionsObject = await getTransactions();
  res.json(transactionsObject);
}catch(err){
  console.log(err)
  return res.status(500).json(err)
}
});

app.get('/', (req, res) => res.json({ server_status: 'working' }))

const server = app.listen(port);

module.exports = server;
