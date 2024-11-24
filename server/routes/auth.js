const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Middleware para proteger rotas
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'secreta', (err, user) => {
      if (err) return res.status(403).json({ error: 'Token inválido' });

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      req.user = user;
      next();
    });
  };
};

// Configuração do Multer para upload de foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/user'); // Pasta onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único do arquivo
  }
});

const upload = multer({ storage: storage });

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Verificar se o email já está em uso
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role // Certifique-se de que isso está sendo passado
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// Rota para login de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, 'secreta', { expiresIn: '1h' });

    res.json({ token, role: user.role , username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Rota para obter o perfil do usuário
router.get('/profile', authMiddleware(), async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'username', 'email', 'role', 'photo'] // Inclui a foto no retorno
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do perfil' });
  }
});

// Rota para atualizar dados do usuário, incluindo foto (se fornecida)
router.patch('/atualiza', authMiddleware(), upload.single('photo'), async (req, res) => {
  try {
    const userId = req.user.id; 
    const { username, email } = req.body; 
    const photo = req.file ? req.file.path : null; // Foto é opcional, se não for enviada, será null

    if (!username && !email && !photo) {
      return res.status(400).json({ error: 'Pelo menos username, email ou foto devem ser fornecidos' });
    }

    // Encontrar o usuário para garantir que existe
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualizar os campos passados
    if (username) user.username = username;
    if (email) user.email = email;
    if (photo) user.photo = photo; // Atualiza a foto apenas se fornecida

    await user.save(); // Salvar alterações no banco de dados

    res.json({
      message: 'Dados atualizados com sucesso',
      user: {
        username: user.username,
        email: user.email,
        photo: user.photo, // Inclui a foto atualizada no retorno
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar os dados do usuário' });
  }
});

// Rota para listar todos os usuários (apenas admin)
router.get('/users', authMiddleware(['admin']), async (req, res) => {
  try {
    const users = await User.findAll(); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Exportar as rotas
module.exports = router;
