const express = require('express');
const app = express();
const port = 3000;
const { getFootprint, getTransactions, getFootprintPerDayTransactionData } = require("./footprintCalculator");
const {insertTransactions} = require("./loadData")
const { Transaction } = require("./models");

// Endpoint to load data from external API into DB
app.get('/insertTransactions', async (req, res) => {

  const transationData = await insertTransactions();
  try{
    return res.json(transationData);
  }catch(err){
    console.log(err)
    return res.status(500).json(err)
   }
 
});

app.get('/footprint', async(req, res) => {
  const footprintObject = await getFootprint();
  res.json(footprintObject);
});

app.get('/footprintPerDay', async(req, res) => {
  const footprintPerDayObject = await getFootprintPerDayTransactionData();
  res.json(footprintPerDayObject);
});

app.get('/transactions', async (req, res) => {
  const transactionsObject = await getTransactions();
  res.json(transactionsObject);
});

app.get('/', (req, res) => res.json({ server_status: 'working' }))

const server = app.listen(port);

module.exports = server;
