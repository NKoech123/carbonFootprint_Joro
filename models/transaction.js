'use strict';
const carbonWeights = require('../config/carbonWeights.json');
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carbonCategory: {
      type: DataTypes.ENUM,
      values: ['food', 'home', 'goods_and_services', 'transport'],
      allowNull: false
    },
    transactionAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };


  Transaction.prototype.carbonAmount = function () {
    const carbonAmount = this.transactionAmount * carbonWeights[this.carbonCategory];
    return parseFloat(carbonAmount.toFixed(2))
  };

  return Transaction;
};
