'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: { type: DataTypes.STRING, allowNull: false },
    isVegetarian: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Transaction);
  };
  return User;
};
