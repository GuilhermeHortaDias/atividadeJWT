// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin')
   
  },
  photo: { // Novo campo para armazenar a imagem
    type: DataTypes.STRING, // Pode ser STRING para armazenar o caminho
    allowNull: true, // Se a imagem não for obrigatória, pode ser true
  },
}, {
  timestamps: true,
});

module.exports = User;
