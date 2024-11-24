const express = require('express');
const Produto = require('../models/Produto');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único do arquivo
  }
});

const upload = multer({ storage: storage });

// Rota para obter um produto pelo ID
router.get('/produto/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByPk(id);
    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

// Rota para obter todos os produtos
router.get('/produto', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});


// Rota para adicionar um novo produto
router.post('/produto', upload.single('image'), async (req, res) => { 
  const { name, description, price, quantity, selectedNumbers } = req.body;
  const image = req.file ? req.file.path : null; 
  
  try {

    const numbersArray = selectedNumbers ? JSON.parse(selectedNumbers) : [];

    const newProduto = await Produto.create({ 
      name, 
      description, 
      price, 
      quantity, 
      image,
      selectedNumbers: numbersArray, 
    });

    res.status(201).json(newProduto);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// Rota para editar um produto
router.put('/produto/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;

  try {
    await Produto.update({ name, description, price, quantity }, { where: { id } });
    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// Rota para deletar um produto
router.delete('/produto/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Produto.destroy({ where: { id } });
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

module.exports = router;
