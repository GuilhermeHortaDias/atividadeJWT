const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const Produto = sequelize.define('Produto', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, 
    allowNull: true, 
  },
  selectedNumbers: { 
    type: DataTypes.JSON, 
    allowNull: true, },
});

module.exports = Produto;
