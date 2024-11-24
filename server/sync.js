const sequelize = require('./config/bd');
const User = require('./models/User');
const Produto = require('./models/Produto')

sequelize.sync({ force: true }).then(() => {
    console.log('Banco de dados sincronizado.');
  }).catch((error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
  });